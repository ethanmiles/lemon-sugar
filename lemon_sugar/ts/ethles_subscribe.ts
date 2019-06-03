

/**
 * ISubscriber:
 * 用于监视游戏发生的事件。
 * 在把 ISubscriber 的实例注册到 Game 实例后，每当任何 ISubscriber实例 关注的事件发生了，Game 实例都会对所有“已注册的” ISubscriber 实例调用 collect 方法，
 * 发送其关注的事件的触发信息。
 * 
 * Game 实例会不断更新每个已注册 ISubscriber 实例的兴趣列表（通过getInteres方法）
 * 
 */

interface ISubscriber {
    collect(doneList: string[]): void;//这个doneList的类型不知道是传string好还是传event？传event的好处是，可以在 event具体实现上拿到更多数据，缺点是需要类型转换。
    getInterest(): string[]
}