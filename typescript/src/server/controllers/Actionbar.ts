RPC.register('inventory:getActionbarItems', async (source: any) => {
    const character = global.exports['np-lib'].getCharacter(source);

    const items = await global.exports['oxmysql'].query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot IN (1, 2, 3, 4, 5)', {
        '@Name': 'body-' + character.id,
    })

    const actionbarItems = Array(5).fill(null);

    items.forEach(item => {
        const slotIndex = item.slot - 1;
        actionbarItems[slotIndex] = item;
    });

    return actionbarItems;
});

RPC.register('inventory:getItemInActionbarSlot', async(source: any, slot: any) => {
    const character = global.exports['np-lib'].getCharacter(source);

    const items = await global.exports['oxmysql'].query_async('SELECT * FROM user_inventory2 WHERE name = @Name AND slot = @Slot', {
        '@Name': 'body-' + character.id,
        '@Slot': slot
    })

    return items
})