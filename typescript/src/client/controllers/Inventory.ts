import { inTrunk, trunkPlate } from "./Trunk";

RegisterCommand('+inventory', async() => {
    // Add checks for taskbar active ect.
    RPC.execute('inventory:additionalInventoriesClear')
    const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), false)

    SendNUIMessage({
        Inventory: Inventory,
    })

    SendNUIMessage({
        show: true,
        PlayerData: {
            character: {
                id: global.exports['isPed'].isPed('cid'),
                name: global.exports['isPed'].isPed('fullname'),
                cash: 0,
                personalVehicle: 'Landstalker',
                home: '#23 No3 Alta Street',
                phone: '+1 (628) 123-4567',
            },
    
            settings: {
                holdToDrag: GetResourceKvpInt('inventory:holdToDrag'),
                shiftQuickMove: GetResourceKvpInt('inventory:shiftQuickMove')
            }
        }
    });

    global.exports.focusmanager.SetUIFocus(true, true)
}, false)

RegisterCommand('-inventory', async() => {}, false)

global.exports['np-keybinds'].registerKeyMapping('inventory', 'Inventory', 'Open Inventory', '+inventory', '-inventory', 'K', true);

onNet('inventory:addItem', async(data: any) => {
    emit('inventory:sendNotification', data.Item, data.Amount, 'Added')
    RPC.execute('inventory:addItem', data)
})

RegisterCommand('pushadditionalinventory', async() => {
    RPC.execute('inventory:additionalInventoriesAdd', {
        Name: 'Mobile Phone',
        ConfigName: 'Phone'
    })

    const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), inTrunk, trunkPlate)

    SendNUIMessage({
        Inventory: Inventory,
    })
}, false)