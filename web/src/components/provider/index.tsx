import { createContext, createSignal, useContext } from "solid-js"
import { createStore } from "solid-js/store";

const InventoryContext = createContext({});

export function App(props: any) {
    const [show, setShow] = createSignal<boolean>(true);
    const [displayActionbar, setDisplayActionBar] = createSignal<boolean>(false);
    const [showingHelpMenu, setShowingHelpMenu] = createSignal<boolean>(false);
    const [showingSettingsMenu, setShowingSettingsMenu] = createSignal<boolean>(false);

    const [hoveringWound, setHoveringWound] = createSignal<boolean>(false);
    const [woundPosition, setWoundPosition] = createSignal<string>('right')

    const [searchedItem, setSearchedItem] = createSignal<string>('')

    const [activeSlot, setActiveSlot] = createSignal<number>(0)

    const [activeInventory, setActiveInventory] = createSignal<string>('');

    const [draggingItem, setDraggingItem] = createStore<any>({
        isDragging: false,
        Item: []
    });

    const [actionbarItems, setActionbarItems] = createStore<any>([
        {
            item_id: 'water'
        },
        {
            item_id: 'pixeltablet'
        },
        {},
        {},
        {},
    ])

    const [splittingItem, setSplittingItem] = createSignal<boolean>(false);
    const [movingSplitItem, setMovingSplitItem] = createSignal<boolean>(false);

    const [Notifications, SetNotfications] = createStore<any>([])

    const [hoveringItem, setHoveringItem] = createStore<any>({
        show: false,
        showingOptions: false,
        frozenPosition: false,
        personalInventory: false,
        canUse: false,

        Information: {
            Name: '',
            Weight: 0,
            Description: '',
            Durability: 0
        }
    })

    const [itemList, setItemList] = createStore<any>({
        'knife': {
            name: 'Knife',
            description: 'Big man ting lets go on glide and shank them possios',
            stackable: false,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/knife.png',
            weight: 7.0,
            context: {
                useItem: true,
            }
        },
        'phone': {
            name: 'Mobile Phone',
            description: 'Just a phone',
            stackable: false,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/phone_1.png',
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
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_idcard.png',
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
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_tablet.png',
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
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_wallet.png',
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
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/water.png',
            weight: 1.0,
            context: {
                useItem: true,
            }
        },
        'cash': {
            name: 'Cash',
            description: 'Cash Money',
            stackable: true,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_cash.png',
            weight: 1.0,
            context: {
                useItem: false,
            }
        },
        'glock': {
            name: 'Glock 19',
            description: 'BULLET BAW BAW GRRRR',
            stackable: false,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_glock.png',
            weight: 5.0,
            context: {
                useItem: true,
            }
        },
        'hotdog': {
            name: 'Hot Dog',
            description: 'HOT DOG????????',
            stackable: true,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/hotdog.png',
            weight: 1.0,
            context: {
                useItem: true,
            }
        },
        'simcard': {
            name: 'Sim Card',
            description: '',
            stackable: false,
            image: 'https://assets.nopixel.net/dev/images/inventory/icons/np_simcard.png',
            weight: 1.0,
            context: {
                useItem: true,
            }
        },

    })

    const [PlayerState, setPlayerState] = createStore<any>({
        character: {
            id: '1000',
            name: 'John Doe',
            cash: 0,
            personalVehicle: 'Landstalker',
            home: '#23 No3 Alta Street',
            phone: '+1 (628) 123-4567',
        },

        settings: {
            holdToDrag: true,
            shiftQuickMove: true
        }
    })

    const [Inventory, setInventory] = createStore<any>({
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
            name: 'pockets-1',
            Slots: [
                {
                    id: 1,
                    icon: 'idcard',
                    item: null,
                    acceptedItems: [
                        'ID Card'
                    ]
                },
                {
                    id: 2,
                    icon: 'phone',
                    item: {
                        itemId: 'phone',
                        durability: 1,
                    },
                    acceptedItems: [
                        'Mobile Phone'
                    ]
                },
                {
                    id: 3,
                    icon: 'tablet',
                    item: null,
                    acceptedItems: [
                        'Pixel Tablet'
                    ]
                },
                {
                    id: 4,
                    icon: 'key',
                    item: null,
                    acceptedItems: [
                        'housekey'
                    ]
                },
                {
                    id: 5,
                    icon: 'wallet',
                    item: null,
                    acceptedItems: [
                        'Wallet'
                    ]
                }
            ]
        },

        PersonalInventory: {
            maxWeight: 150,
            inventoryName: 'body-1',
            slots: [
                {
                    id: 1,
                    hotBar: true,
                    item: {
                        itemId: 'phone',
                        durability: 1,
                    },
                },
                {
                    id: 2,
                    hotBar: true,
                    item: {
                        itemId: 'knife',
                        durability: 25,
                    },
                },
                {
                    id: 3,
                    hotBar: true,
                    item: {
                        itemId: 'id_card',
                        durability: 1,
                    },
                },
                {
                    id: 4,
                    hotBar: true,
                    item: {
                        itemId: 'pixeltablet',
                        durability: 1,
                    },
                },
                {
                    id: 5,
                    hotBar: true,
                    item: {
                        itemId: 'wallet',
                        durability: 1,
                    },
                },
                {
                    id: 6,
                    item: null,
                },
                {
                    id: 7,
                    item: null,
                },
                {
                    id: 8,
                    item: null,
                },
                {
                    id: 9,
                    item: null,
                },
                {
                    id: 10,
                    item: {
                        itemId: 'cash',
                        amount: 100,
                    },
                },
                {
                    id: 11,
                    item: {
                        itemId: 'glock',
                    },
                },
                {
                    id: 12,
                    item: {
                        itemId: 'hotdog',
                        amount: 5,
                    },
                },
                {
                    id: 13,
                    item: {
                        itemId: 'water',
                    },
                },
                {
                    id: 14,
                    item: {
                        itemId: 'water',
                    },
                },
                {
                    id: 15,
                    item: {
                        itemId: 'water',
                    },
                },
            ]
        },

        PersonalBackpack: {
            maxWeight: 250,
            inventoryName: 'backpack-1',
            slots: [
                {
                    id: 1,
                    item: {
                        itemId: 'knife',
                        durability: 76,
                    },
                },
                {
                    id: 2,
                    item: null,
                },
                {
                    id: 3,
                    item: null,
                },
                {
                    id: 4,
                    item: null,
                },
                {
                    id: 5,
                    item: null,
                },
                {
                    id: 6,
                    item: null,
                },
                {
                    id: 7,
                    item: null,
                },
                {
                    id: 8,
                    item: null,
                },
                {
                    id: 9,
                    item: null,
                },
                {
                    id: 10,
                    item: null,
                },
                {
                    id: 11,
                    item: null,
                },
                {
                    id: 12,
                    item: null,
                },
                {
                    id: 13,
                    item: null,
                },
                {
                    id: 14,
                    item: null,
                },
                {
                    id: 15,
                    item: null,
                },
                {
                    id: 16,
                    item: null,
                },
                {
                    id: 17,
                    item: null,
                },
                {
                    id: 18,
                    item: null,
                },
                {
                    id: 19,
                    item: null,
                },
                {
                    id: 20,
                    item: null,
                },
                {
                    id: 21,
                    item: null,
                },
                {
                    id: 22,
                    item: null,
                },
                {
                    id: 23,
                    item: null,
                },
                {
                    id: 24,
                    item: null,
                },
                {
                    id: 25,
                    item: null,
                },
            ]
        },

        PrimarySecondaryInventory: {
            maxWeight: 150,
            Weight: 1,
            inventoryName: 'glovebox-NE14ABJ',
            inventoryLabel: 'Glovebox',
            slots: [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        },

        Drops: [
            {
                id: 1,
                item: null,
            },
            {
                id: 2,
                item: null,
            },
            {
                id: 3,
                item: null,
            },
            {
                id: 4,
                item: null,
            },
            {
                id: 5,
                item: null,
            },
            {
                id: 6,
                item: null,
            },
            {
                id: 7,
                item: null,
            },
            {
                id: 8,
                item: null,
            },
            {
                id: 9,
                item: null,
            },
            {
                id: 10,
                item: null,
            },
            {
                id: 11,
                item: null,
            },
            {
                id: 12,
                item: null,
            },
            {
                id: 13,
                item: null,
            },
            {
                id: 14,
                item: null,
            },
            {
                id: 15,
                item: null,
            },
            {
                id: 16,
                item: null,
            },
            {
                id: 17,
                item: null,
            },
            {
                id: 18,
                item: null,
            },
            {
                id: 19,
                item: null,
            },
            {
                id: 20,
                item: null,
            },
            {
                id: 21,
                item: null,
            },
            {
                id: 22,
                item: null,
            },
            {
                id: 23,
                item: null,
            },
            {
                id: 24,
                item: null,
            },
            {
                id: 25,
                item: null,
            },
            {
                id: 26,
                item: null,
            },
            {
                id: 27,
                item: null,
            },
            {
                id: 28,
                item: null,
            },
            {
                id: 29,
                item: null,
            },
            {
                id: 30,
                item: null,
            },
            {
                id: 31,
                item: null,
            },
            {
                id: 32,
                item: null,
            },
            {
                id: 33,
                item: null,
            },
            {
                id: 34,
                item: null,
            },
            {
                id: 35,
                item: null,
            },
            {
                id: 36,
                item: null,
            },
            {
                id: 37,
                item: null,
            },
            {
                id: 38,
                item: null,
            },
            {
                id: 39,
                item: null,
            },
            {
                id: 40,
                item: null,
            },
            {
                id: 41,
                item: null,
            },
            {
                id: 42,
                item: null,
            },
            {
                id: 43,
                item: null,
            },
            {
                id: 44,
                item: null,
            },
            {
                id: 45,
                item: null,
            },
            {
                id: 46,
                item: null,
            },
            {
                id: 47,
                item: null,
            },
            {
                id: 48,
                item: null,
            },
            {
                id: 49,
                item: null,
            },
            {
                id: 50,
                item: null,
            },
        ],

        AdditionalInventories: [
            {
                id: 'body-15',
                name: 'Robbed Player',
                maxWeight: 5,
                InventoryOpened: true,
                inventoryName: 'body-25',
                slots: [
                    {
                        id: 1,
                        item: {
                            itemId: 'water',
                            durability: 1,
                        },
                    },
                    {
                        id: 1,
                        item: {
                            itemId: 'water',
                            durability: 50,
                        },
                    }
                ]
            },
            {
                id: '2',
                name: 'Mobile Phone',
                maxWeight: 5,
                InventoryOpened: false,
                inventoryName: 'phone-1',
                slots: [
                    {
                        id: 1,
                        item: {
                            itemId: 'simcard',
                        },
                    }
                ]
            },
        ]
    })

    return (
        <InventoryContext.Provider
            value={{
                showingHelpMenu,
                setShowingHelpMenu,
                showingSettingsMenu,
                setShowingSettingsMenu,
                Inventory,
                setInventory,
                hoveringWound,
                setHoveringWound,
                PlayerState,
                setPlayerState,
                show,
                setShow,
                displayActionbar,
                setDisplayActionBar,
                hoveringItem,
                setHoveringItem,
                splittingItem,
                setSplittingItem,
                itemList,
                setItemList,
                Notifications,
                SetNotfications,
                draggingItem,
                setDraggingItem,
                activeInventory,
                setActiveInventory,
                activeSlot,
                setActiveSlot,
                movingSplitItem,
                setMovingSplitItem,
                actionbarItems,
                setActionbarItems,
                woundPosition,
                setWoundPosition,
                searchedItem,
                setSearchedItem
            }}

            children={props.children}
        />
    )
}

export function getInventoryContext(): any {
    return useContext(InventoryContext)
}