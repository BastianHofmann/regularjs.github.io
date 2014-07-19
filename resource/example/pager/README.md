# Linked pager component

pager is a good Example for [two-way binding between components](). Beacuse,
  
1. 默认两个分别进行初始化的组件是没有联系的， 它们拥有不同的生命周期
2. 我们可以通过 $bind 让两个组件建立部分联系

 we usaully use pager > 2 in one page. and we need two pager is synced. In this case, the `$bind` will help you.