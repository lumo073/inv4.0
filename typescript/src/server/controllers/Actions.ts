import { InventoryConfig } from "./Config";
import { findNextAvailableSlot } from "./Functions";
import { Inventory } from "./Inventory";
import { ItemList } from "./ItemList";

RPC.register('inventory:addItem', async(source: any, data: any) => {
    const character = global.exports['np-lib'].getCharacter(source)
    const foundItem = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND item_id = @ItemId', {
        ['@Name']: 'body-' + character.id,
        ['@ItemId']: data.Item
    });

    if (foundItem[0]) {
        if (ItemList[data.Item].stackable) {
            console.log('Went past the ItemList[data.Item].stackable')

            for (let i = 0; i < data.Amount; i++) {
                global.exports['oxmysql'].query_async('INSERT INTO user_inventory2 (item_id, name, slot) VALUES (@ItemId, @Name, @Slot)', {
                    ['@ItemId']: data.Item,
                    ['@Name']: 'body-' + character.id,
                    ['@Slot']: foundItem[0].slot,
                })
            }
        } else {
            for (let i = 0; i < data.Amount; i++) {
                global.exports['oxmysql'].query_async('INSERT INTO user_inventory2 (item_id, name, slot) VALUES (@ItemId, @Name, @Slot)', {
                    ['@ItemId']: data.Item,
                    ['@Name']: 'body-' + character.id,
                    ['@Slot']: await findNextAvailableSlot(source, 'body-' + character.id),
                })
            }
        }
    } else {
        const Slot = await findNextAvailableSlot(source, 'body-' + character.id)

        for (let i = 0; i < data.Amount; i++) {
            if (ItemList[data.Item].stackable) {
                global.exports['oxmysql'].query_async('INSERT INTO user_inventory2 (item_id, name, slot) VALUES (@ItemId, @Name, @Slot)', {
                    ['@ItemId']: data.Item,
                    ['@Name']: 'body-' + character.id,
                    ['@Slot']: Slot,
                })
            } else {
                global.exports['oxmysql'].query_async('INSERT INTO user_inventory2 (item_id, name, slot) VALUES (@ItemId, @Name, @Slot)', {
                    ['@ItemId']: data.Item,
                    ['@Name']: 'body-' + character.id,
                    ['@Slot']: await findNextAvailableSlot(source, 'body-' + character.id),
                })
            }
        }
    }
})

// Todo:
// Add all weight checks.
// Make it so you can use an item in your backpack ? NoPixel has this.

RPC.register('inventory:dragItem', async (source: any, data: any) => {
    if (data.toSlot && data.toInventory) {
        if (data.toInventory.includes('pockets')) {
            if (!Inventory.Pockets.Slots[data.toSlot - 1].acceptedItems.includes(ItemList[data.itemId].name)) {
                return
            }
        }

        const Item = await global.exports['oxmysql'].query_async('SELECT * FROM user_inventory2 WHERE slot = @Slot AND item_id = @ItemId AND name = @Name', {
            '@Slot': data.fromSlot,
            '@ItemId': data.itemId,
            '@Name': data.fromInventory
        });
    
        if (Item) {
            const OldItem = await global.exports['oxmysql'].query_async('SELECT * FROM user_inventory2 WHERE slot = @Slot AND name = @Name', {
                '@Slot': data.toSlot,
                '@Name': data.toInventory
            })
    
            if (OldItem[0]) {
                if (OldItem[0].item_id == data.itemId) {
                    if (ItemList[data.itemId].stackable) {
                        await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND item_id = @ItemId', {
                            '@oldSlot': data.fromSlot,
                            '@Slot': data.toSlot,
                            '@Name': data.toInventory,
                            '@ItemId': data.itemId
                        })
                    }
                } else {
                    if (data.fromInventory.includes('pockets')) {
                        if (!Inventory.Pockets.Slots[data.fromSlot - 1].acceptedItems.includes(ItemList[OldItem[0].item_id].name)) {
                            return
                        }
                    }

                    // Todo:
                    // Check the weight of both invs if has enough weight swap them..
                    
                    await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND item_id = @ItemId AND name = @toInv', {
                        '@oldSlot': data.fromSlot,
                        '@Slot': data.toSlot,
                        '@toInv': data.fromInventory,
                        '@Name': data.toInventory,
                        '@ItemId': data.itemId
                    })

                    await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND item_id = @ItemId AND name = @toInv', {
                        '@oldSlot': data.toSlot,
                        '@Slot': data.fromSlot,
                        '@toInv': data.toInventory,
                        '@Name': data.fromInventory,
                        '@ItemId': OldItem[0].item_id
                    })
                }
            } else {
                await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND item_id = @ItemId AND name = @oldName', {
                    '@oldSlot': data.fromSlot,
                    '@oldName': data.fromInventory,
                    '@Slot': data.toSlot,
                    '@Name': data.toInventory,
                    '@ItemId': data.itemId
                })
            }
        }
    }
})

RPC.register('inventory:splitItem', async(source: any, data: any) => {
    if (data.toInventory.includes('pockets')) {
        if (!Inventory.Pockets.Slots[data.toSlot - 1].acceptedItems.includes(ItemList[data.itemId].name)) {
            return
        }
    }
    
    const foundItem = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
        ['@Name']: data.toInventory,
        ['@Slot']: data.toSlot
    });

    if (foundItem[0] !== undefined) {
        if (ItemList[foundItem[0].item_id].name === data.itemId) {
            await global.exports['oxmysql'].query_async(`UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND name = @oldName LIMIT ${data.amount}`, {
                '@oldSlot': data.fromSlot,
                '@Slot': data.toSlot,
                '@Name': data.toInventory,
                '@oldName': data.fromInventory
            })
        }
    } else {
        await global.exports['oxmysql'].query_async(`UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE slot = @oldSlot AND name = @oldName LIMIT ${data.amount}`, {
            '@oldSlot': data.fromSlot,
            '@Slot': data.toSlot,
            '@Name': data.toInventory,
            '@oldName': data.fromInventory
        })
    }
})

const equipSlots = {
    'id_card': 1,
    'phone': 2,
    'pixeltablet': 3,
    'key': 4,
    'wallet': 5
}

RPC.register('inventory:equipItem', async(source: any, data: any) => {
    const character = global.exports['np-lib'].getCharacter(source)

    const foundItem = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
        ['@Name']: 'pockets-' + character.id,
        ['@Slot']: equipSlots[data.ItemId]
    });

    if (!foundItem[0]) {
        const Item = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
            ['@Name']: data.Inventory,
            ['@Slot']: data.Slot
        });

        if (Item[0]) {
            await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE id = @Id', {
                '@Id': Item[0].id,
                '@Slot': equipSlots[data.ItemId],
                '@Name': 'pockets-' + character.id
            })    
        }
    }
})

RPC.register('inventory:unequipItem', async(source: any, data: any) => {
    const character = global.exports['np-lib'].getCharacter(source)

    const foundItem = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
        ['@Name']: 'pockets-' + character.id,
        ['@Slot']: data.Slot
    });

    const newSlot = await findNextAvailableSlot(source, 'body-' + character.id)

    if (foundItem[0] && newSlot) {
        await global.exports['oxmysql'].query_async('UPDATE user_inventory2 SET slot = @Slot, name = @Name WHERE id = @Id', {
            '@Id': foundItem[0].id,
            '@Slot': newSlot,
            '@Name': 'body-' + character.id
        })    
    }
})