let actionBarTimeout: any

global.exports['np-keybinds'].registerKeyMapping('ActionBar', 'Inventory', 'Show actionbar', '+actionBar', '-actionBar', 'TAB')

async function getActionbarItems() {
    const items = await RPC.execute('inventory:getActionbarItems');

    SendNUIMessage({
        actionBarItems: items
    });
}

async function displayActionbar(state: any) {
    getActionbarItems()
    SendNUIMessage({
        event: 'inventory:toggleActionbar'
    });

    global.exports.hud.sendAppEvent({
        showLargeIcons: state,
        displayAllForce: state,
        displayAllForceVehicle: state ? !!GetVehiclePedIsIn(PlayerPedId(), false) : false,
        displayRadioChannel: state
    });
}

RegisterCommand('+actionBar', () => {
    displayActionbar(true);
}, false);

RegisterCommand('-actionBar', () => {
    displayActionbar(false);
}, false);

RegisterCommand('hideactionbar', () => {
    SendNUIMessage({
        event: 'inventory:toggleActionbar'
    });
}, false)

let actionbarTimeout = false
const actionBarSlots = [1, 2, 3, 4, 5];

actionBarSlots.forEach(slot => {
    global.exports['np-keybinds'].registerKeyMapping('inventory', 'Inventory', `Actionbar Slot ${slot}`, `+useActionbar_${slot}`, '', slot, true);

    RegisterCommand(`+useActionbar_${slot}`, async () => {
        console.log(`[DEBUG] Inventory using actionbar slot ${slot}`);
        const Item = await RPC.execute('inventory:getItemInActionbarSlot', slot)

        if (Item[0].item_id && !actionbarTimeout) {
            emit('inventory:sendNotification', Item[0].item_id, 1, 'Used')

            actionbarTimeout = true

            setTimeout(() => {
                actionbarTimeout = false
            }, 2500)
        }

    }, false);
});