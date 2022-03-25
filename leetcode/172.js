/*
给定一个整数 n ，返回 n! 结果中尾随零的数量。

提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1

 

示例 1：

输入：n = 3
3 * 2 * 1
输出：0
解释：3! = 6 ，不含尾随 0
示例 2：

输入：n = 5
5 * 4 * 3
输出：1
解释：5! = 120 ，有一个尾随 0
示例 3：

输入：n = 0
输出：0
 

提示：

0 <= n <= 104
*/

/**
 * @param {number} n
 * @return {number}
 */
 var trailingZeroes = function(n) {
    //  let num = 0;
    // for (let i = 5; i <= n; i += 5) {
    //     for (let j = i; j % 5 === 0; j /= 5) {
    //         num++;
    //     }
    // }
    // return num;
    let count = 0;
    while (n > 0) {
        count += Math.floor(n / 5);
        n = n / 5;
    }
    return count;
};
