global.exports("getItemListNames", async() => {
    const orderedItems = [];
    const itemList = await RPC.execute('inventory:getItemList');

    Object.keys(itemList).forEach((itemName, index) => {
        const data = itemList[itemName];
        orderedItems.push({
            id: itemName,
            name: data.name
        });
    });

    return orderedItems;
});

global.exports("HasItem", async(Item: any, Amount: any) => {
    // TODO
})

global.exports("OpenInventory", async() => {
    ExecuteCommand('+inventory')
})