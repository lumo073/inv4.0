const Drops = []

on('Inventory:Drops:Create', () => {

})

const createDrop = () => {
    const object = 'hei_prop_heist_box'
    const coords = GetEntityCoords(PlayerPedId())

    const box = CreateObject(GetHashKey(object), coords.x, coords.y, coords.z, false, false, false)
    PlaceObjectOnGroundProperly(box)
    FreezeEntityPosition(box, true)
    SetEntityCollision(box, false, false)
}