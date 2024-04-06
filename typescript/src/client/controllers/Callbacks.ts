import { NUI } from "../modules/nui"
import { inTrunk, trunkPlate, trunkState } from "./Trunk"

NUI.register('closeInventory', async(data: any, cb: any) => {
    global.exports.focusmanager.SetUIFocus(false, false)
    trunkState()
})

NUI.register('updateSettings', async(data: any, cb: any) => {
    SetResourceKvpInt('inventory:holdToDrag', data.holdToDrag ? 1 : 0)
    SetResourceKvpInt('inventory:shiftQuickMove', data.shiftQuickMove ? 1 : 0)
})

NUI.register('itemDrag', async(data: any, cb: any) => {
    RPC.execute('inventory:dragItem', data)

    setTimeout(async() => {
        const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), inTrunk, trunkPlate)
    
        SendNUIMessage({Inventory: Inventory})
    }, 100)
})

NUI.register('itemSplit', async(data: any, cb: any) => {
    RPC.execute('inventory:splitItem', data)

    setTimeout(async() => {
        const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), inTrunk, trunkPlate)
    
        SendNUIMessage({Inventory: Inventory})
    }, 100)
})

NUI.register('equipItem', async(data: any, cb: any) => {
    RPC.execute('inventory:equipItem', data)

    setTimeout(async() => {
        const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), inTrunk, trunkPlate)
    
        SendNUIMessage({Inventory: Inventory})
    }, 100)
})

NUI.register('unequipItem', async(data: any, cb: any) => {
    RPC.execute('inventory:unequipItem', data)

    setTimeout(async() => {
        const Inventory = await RPC.execute('inventory:getInventories', IsPedInVehicle(PlayerPedId(), GetVehiclePedIsIn(PlayerPedId(), false), false), GetVehicleNumberPlateText(GetVehiclePedIsIn(PlayerPedId(), false)), inTrunk, trunkPlate)
    
        SendNUIMessage({Inventory: Inventory})
    }, 100)
})

NUI.register('useItem', async(data: any, cb: any) => {
    emit('inventory:sendNotification', data.ItemId, 1, 'Used')
})