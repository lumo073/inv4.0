import { AdditionalInventories, getAdditionalInventories } from './AdditionalInventories'
import { InventoryConfig } from './Config'
import { calculateInventoryWeight, getInventory, getItemInSlot } from './Functions'
export let Inventory: any = [] 

// Make it have a config for the slots of all inventories and do a map instead of doing single slots.
// Do weights.

RPC.register('inventory:getInventories', async(source: any, inVehicle: any, licensePlate: any, isTrunk: any, TrunkPlate: any) => {
    const character = global.exports['np-lib'].getCharacter(source)

    Inventory = {
        // Make the clothing and pockets slots generate like backpack and personalinv.
        // Pass the weight and max weight and do it on the UI.
        ClothingSlots: [
            {
                id: 'hat',
                item: null,
                acceptedItems: [
                    'hat'
                ]
            },
            {
                id: 'mask',
                item: null,
                acceptedItems: [
                    'mask'
                ]
            },
            {
                id: 'glasses',
                item: null,
                acceptedItems: [
                    'glasses'
                ]
            },
            {
                id: 'armor',
                item: null,
                acceptedItems: [
                    'armorplate'
                ]
            },
            {
                id: 'bag',
                item: null,
                acceptedItems: [
                    'bag'
                ]
            }
        ],

        Pockets: {
            name: 'pockets-' + character.id,
            Slots: [
                {
                    id: 1,
                    icon: 'idcard',
                    item: await getItemInSlot(source, 'pockets-' + character.id, 1),
                    acceptedItems: [
                        'ID Card'
                    ]
                },
                {
                    id: 2,
                    icon: 'phone',
                    // item: {
                    //     itemId: 'phone',
                    //     durability: 1,
                    // },
                    item: await getItemInSlot(source, 'pockets-' + character.id, 2),
                    acceptedItems: [
                        'Mobile Phone'
                    ]
                },
                {
                    id: 3,
                    icon: 'tablet',
                    item: await getItemInSlot(source, 'pockets-' + character.id, 3),
                    acceptedItems: [
                        'Pixel Tablet'
                    ]
                },
                {
                    id: 4,
                    icon: 'key',
                    item: await getItemInSlot(source, 'pockets-' + character.id, 4),
                    acceptedItems: [
                        'housekey'
                    ]
                },
                {
                    id: 5,
                    icon: 'wallet',
                    item: await getItemInSlot(source, 'pockets-' + character.id, 5),
                    acceptedItems: [
                        'Wallet'
                    ]
                }
            ]
        },

        PersonalInventory: {
            maxWeight: InventoryConfig.PersonalInventory.MaxWeight,
            Weight: await calculateInventoryWeight('body-' + character.id),
            inventoryName: 'body-' + character.id,
            slots: await getInventory('body-' + character.id, InventoryConfig.PersonalInventory.Slots, true)
        },

        PersonalBackpack: {
            maxWeight: InventoryConfig.Backpack.MaxWeight,
            Weight: await calculateInventoryWeight('backpack-' + character.id),
            inventoryName: 'backpack-' + character.id,
            slots: await getInventory('backpack-' + character.id, InventoryConfig.Backpack.Slots, false)
        },

        AdditionalInventories: await getAdditionalInventories(source)
    }

    if (!inVehicle) {
        Inventory.PrimarySecondaryInventory = {
            maxWeight: 150,
            Weight: await calculateInventoryWeight('drop-1'),
            inventoryName: 'drop-1',
            inventoryLabel: 'Ground',
            slots: await getInventory('drop-1', InventoryConfig.Drop.Slots, false)
        }
    }

    if (inVehicle && !isTrunk) {
        Inventory.PrimarySecondaryInventory = {
            maxWeight: 150,
            Weight: await calculateInventoryWeight('glovebox::' + licensePlate),
            inventoryName: 'glovebox::' + licensePlate,
            inventoryLabel: 'Glovebox',
            slots: await getInventory('glovebox::' + licensePlate, InventoryConfig.Glovebox.Slots, false)
        }
    }

    if (isTrunk) {
        Inventory.PrimarySecondaryInventory = {
            maxWeight: InventoryConfig.Trunk.MaxWeight,
            Weight: await calculateInventoryWeight('trunk::' + TrunkPlate),
            inventoryName: 'trunk::' + TrunkPlate,
            inventoryLabel: 'Trunk',
            slots: await getInventory('trunk::' + TrunkPlate, InventoryConfig.Trunk.Slots, false)
        }
    }

    return Inventory
})
