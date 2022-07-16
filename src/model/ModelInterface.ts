interface ModelInterface {
    create: (values: object) => any
    update: (oldItem: object, values: object) => any
}