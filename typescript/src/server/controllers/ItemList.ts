async function createImage(Item: any) {
    return `https://assets.nopixel.net/dev/images/inventory/icons/${Item}.png`
}

export const ItemList = {
    'knife': {
        name: 'Knife',
        description: 'Big man ting lets go on glide and shank them possios',
        stackable: false,
        image: createImage('knife'),
        weight: 7.0,
        context: {
            useItem: true,
        }
    },
    'phone': {
        name: 'Mobile Phone',
        description: 'Just a phone',
        stackable: false,
        image: createImage('phone_1'),
        weight: 7.0,
        context: {
            useItem: true,
            equipItem: true,
            openItem: 'Open Sim Slot'
        }
    },
    'id_card': {
        name: 'ID Card',
        description: 'WOT DA FOOK',
        stackable: false,
        image: createImage('np_idcard'),
        weight: 1.0,
        context: {
            useItem: true,
            equipItem: true,
        }
    },
    'pixeltablet': {
        name: 'Pixel Tablet',
        description: 'Tablet',
        stackable: false,
        image: createImage('np_tablet'),
        weight: 1.0,
        context: {
            useItem: true,
            equipItem: true,
        }
    },
    'wallet': {
        name: 'Wallet',
        description: 'Wallet',
        stackable: false,
        image: createImage('np_wallet'),
        weight: 1.0,
        context: {
            useItem: true,
            equipItem: true,
        }
    },
    'water': {
        name: 'Water',
        description: 'U Thirsty Mate??',
        stackable: true,
        image: createImage('water'),
        weight: 1.0,
        context: {
            useItem: true,
        }
    },
    'cash': {
        name: 'Cash',
        description: 'Cash Money',
        stackable: true,
        image: createImage('np_cash'),
        weight: 1.0,
        context: {
            useItem: false,
        }
    },
    'glock': {
        name: 'Glock 19',
        description: 'BULLET BAW BAW GRRRR',
        stackable: false,
        image: createImage('np_glock'),
        weight: 5.0,
        context: {
            useItem: true,
        }
    },
    'hotdog': {
        name: 'Hot Dog',
        description: 'HOT DOG????????',
        stackable: true,
        image: createImage('hotdog'),
        weight: 1.0,
        context: {
            useItem: true,
        }
    },
    'simcard': {
        name: 'Sim Card',
        description: '',
        stackable: false,
        image: createImage('np_simcard'),
        weight: 1.0,
        context: {
            useItem: true,
        }
    },
}

RPC.register('inventory:getItemList', async() => {
    return ItemList
})