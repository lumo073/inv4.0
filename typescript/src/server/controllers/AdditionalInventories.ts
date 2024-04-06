import { InventoryConfig } from "./Config";
import { calculateInventoryWeight, getInventory } from "./Functions";

export let AdditionalInventories = {};

RPC.register('inventory:additionalInventoriesClear', async (source: any) => {
    const character = global.exports['np-lib'].getCharacter(source);
    AdditionalInventories[character.id] = [];
});

RPC.register('inventory:additionalInventoriesAdd', async (source: any, data: any) => {
    const character = global.exports['np-lib'].getCharacter(source);

    if (!Array.isArray(AdditionalInventories[character.id])) {
        AdditionalInventories[character.id] = [];
    }

    AdditionalInventories[character.id].push({
        id: AdditionalInventories[character.id].length + 1,
        name: 'phone-1',
        inventoryName: data.Name,
        ConfigName: data.ConfigName
    });
});

export async function getAdditionalInventories(source: any) {
    const character = global.exports['np-lib'].getCharacter(source);
    const AddedInventory = []

    AdditionalInventories[character.id].map(async (data: any) => {
        AddedInventory.push({
            id: data.id,
            name: data.name,
            maxWeight: InventoryConfig[data.ConfigName].MaxWeight ? InventoryConfig[data.ConfigName].MaxWeight : 100,
            Weight: await calculateInventoryWeight(data.name),
            InventoryOpened: true,
            inventoryName: data.inventoryName,
            slots: await getInventory(data.name, InventoryConfig[data.ConfigName].Slots, false)
        })
    })

    return AddedInventory
}