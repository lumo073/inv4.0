import { InventoryConfig } from "./Config";
import { ItemList } from "./ItemList";

export async function getItemInSlot(source: any, Inventory: any, slot: any) {
    const Item = await getItem(source, Inventory, slot);
    if (Item && Item.length > 0) {
        return {
            itemId: Item[0].item_id,
            durability: 100,
            amount: Item.length
        };
    } else {
        return null;
    }
}

async function getItem(source: any, Inventory: any, slot: any) {
    const itemData = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
        ['@Name']: Inventory,
        ['@Slot']: slot
    });

    return itemData;
}

// Todo:
// If the slot is above the item slots in the config then return cant find slot..
// Check inventory weight

export async function findNextAvailableSlot(source: any, Inventory: any) {
    const itemData = await global.exports.oxmysql.query_async('SELECT MAX(slot) AS maxSlot FROM user_inventory2 WHERE name = @Name', {
        '@Name': Inventory,
    });

    const highestSlot = itemData.length > 0 ? itemData[0].maxSlot : 0;

    for (let slot = 1; slot <= highestSlot + 1; slot++) {
        const slotCheck = await global.exports.oxmysql.query_async('SELECT COUNT(*) AS count FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
            '@Name': Inventory,
            '@Slot': slot
        });

        if (slot > 15) {
            // emitNet('DoLongHudText', source, 'No available slots.', 2)
            return
        }

        if (slotCheck[0].count === 0) {
            return slot;
        }
    }

    return '[ERROR] NO AVAILABLE SLOTS';
}

export async function calculateInventoryWeight(Inventory: any) {
    const itemData = await global.exports.oxmysql.query_async('SELECT * FROM user_inventory2 WHERE name = @Name', {
        ['@Name']: Inventory,
    });

    let totalWeight = 0;

    for (const item of itemData) {
        totalWeight += ItemList[item.item_id].weight;
    }

    return totalWeight;
}

function checkIfHotbar(id: number) {
    if (id >= 1 && id <= 5) {
        return true;
    } else {
        return false;
    }
}

export async function getInventory(savedName: any, Slots: any, checkHotbar: any) {
    const Inventory = []

    for (let i = 0; i < Slots; i++) {
        Inventory.push({
            id: i + 1,
            hotBar: checkHotbar ? checkIfHotbar(i + 1) : false,
            item: await getItemInSlot(source, savedName, i + 1),
        })
    }

    return Inventory
}