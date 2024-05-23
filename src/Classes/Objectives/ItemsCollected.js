import { Objective } from "./Objective"

export class ItemsCollected extends Objective {
    constructor({noItemsToCollect}) {
        super()
        this.type = "itemsCollected"
    }
}