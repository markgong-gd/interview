/*
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

 

示例 1：


输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
示例 2：



输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    const hair = new ListNode();
    hair.next = head;
    let pre = hair;
    while (head) {
        let tail = pre;
        for (let i = 0; i < k; i++) {
            const n = tail.next;
            tail = n;
            if (!tail) return hair.next;
        }
        const nxt = tail.next;
        [head, tail] = swapList(head, tail);
        pre.next = head;
        tail.next = nxt;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
};

function swapList(head, tail) {
    let nTail = tail.next;
    let p = head;
    while (nTail !== tail) {
        const nHead = p.next;
        p.next = nTail;
        nTail = p;
        p = nHead;
    }
    return [tail, head];
}

/**
 * 1. 添加hair虚拟头，pre（移动虚拟头）
 * 2. 定义尾tail
 * 3. tail移动k步，记录tail.next为nxt
 * 4. 翻转head, tail, head、tail重新赋值
 * 5. 连接翻转结果，pre.next = head，tail.next = nxt
 * 6. 移动head => nxt，pre => tail
 * 7. 直到tail为空，输出hair.next
 */
