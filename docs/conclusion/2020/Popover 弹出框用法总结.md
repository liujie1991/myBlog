# Popover 弹出框用法总结
##  引言

最近项目中多次用到了Popover弹出框，在使用时，也遇到了一些坑，比如如何控制显示和隐藏，及在表格数据中如何针对当条数据进行显示和隐藏，所以对Popover相关知识做了一个总结。

##  Popover 弹出框用法总结

Popover 有四种激活方式，主要支持四种触发方式：hover，click，focus 和 manual，通过trigger属性用于设置何时触发 Popover。触发方式主要分为两种：使用 slot="reference" 的具名插槽，或使用自定义指令v-popover指向 Popover 的索引ref。


![](https://user-gold-cdn.xitu.io/2019/11/2/16e2b25f031a114a?w=401&h=48&f=png&s=3599 '描述')
###  使用 slot="reference" 的具名插槽
```javascript
<el-popover
placement="top-start"
title="标题"
width="200"
trigger="hover"
content="这是hover 激活。"
>
<el-button slot="reference">hover 激活</el-button>
</el-popover>
<el-popover
placement="bottom"
title="标题"
width="200"
trigger="click"
content="这是click 激活。"
>
<el-button slot="reference">click 激活</el-button>
</el-popover>
<el-popover
placement="right"
title="标题"
width="200"
trigger="focus"
content="这是focus 激活"
>
<el-button slot="reference">focus 激活</el-button>
</el-popover>
<el-popover
placement="bottom"
title="标题"
width="200"
trigger="manual"
content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
v-model="visible"
>
<el-button
slot="reference"
@click="visible = !visible"
>手动激活</el-button>
</el-popover>
```
### 使用自定义指令v-popover指向 Popover 的索引ref

```javascript
 <el-popover
ref="popover-hover"
placement="top-start"
title="标题"
width="200"
trigger="hover"
content="这是hover 激活。"
>
</el-popover>
<el-button v-popover:popover-hover>hover 激活</el-button>
<el-popover
ref="popover-click"
placement="bottom"
title="标题"
width="200"
trigger="click"
content="这是click 激活。"
>
</el-popover>
<el-button v-popover:popover-click>click 激活</el-button>
<el-popover
ref="popover-focus"
placement="right"
title="标题"
width="200"
trigger="focus"
content="focus 激活"
>
</el-popover>
<el-button v-popover:popover-focus>focus 激活</el-button>
<el-popover
ref="popover"
placement="bottom"
title="标题"
width="200"
trigger="manual"
content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
v-model="visible"
>
</el-popover>
<el-button
v-popover:popover
@click="visible = !visible"
>手动激活</el-button>
```
可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

```javascript

<el-popover
    placement="right"
    width="400"
    trigger="click"
    v-model="visible"
    >
<el-table :data="gridData">
    <el-table-column
        width="150"
        property="date"
        label="日期"
    ></el-table-column>
    <el-table-column
        width="100"
        property="name"
        label="姓名"
    ></el-table-column>
</el-table>
<div style="text-align: right; margin: 0">
    <el-button
        size="mini"
        type="text"
        @click="visible = false"
    >取消</el-button>
    <el-button
        type="primary"
        size="mini"
        @click="visible = false"
    >确定</el-button>
</div>
<el-button slot="reference">click 激活</el-button>
</el-popover>
```

![](https://user-gold-cdn.xitu.io/2019/11/2/16e2b26247b6f70c?w=527&h=259&f=png&s=9794 '描述')
同时Popover还有很多事件属性，例如：show	显示时触发—after-enter	显示动画播放完毕后触发	—hide	隐藏时触发	—after-leave	隐藏动画播放完毕后触发，等
其实以上内容在Element-UI 使用手册文档 V2.4.6 （Vue版本），这里做了一些归纳。具体可访问
地址：https://www.bookstack.cn/books/Element-UI-vue
## Popover弹出框隐藏问题
在实际项目中，Popover弹出框不仅仅是显示一下，在Popover弹出框弹出框中还会有许多其他的操作，操作完后，点击保存或取消，弹出框就应该随之隐藏。我们先从简单的来看。
### 单纯按钮的弹出与隐藏
其实上面代码中，已经实现了一种较简单的弹出与隐藏。下面我们看实例：
```javascript
<el-popover
    placement="right"
    width="400"
    trigger="manual"
    v-model="visible"
>
    <el-form
      ref="form"
      label-position="top"
      class="page-form"
      style="margin-bottom: 80px;"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="车位名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          tips-placement="top-start"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="车位名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.sex"
          tips-placement="top-start"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: right; margin: 0">
      <el-button
        size="mini"
        type="text"
        @click="visible = false"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="visible = false"
      >确定</el-button>
    </div>
    <el-button slot="reference">click 激活</el-button>
  </el-popover>
```
![](https://user-gold-cdn.xitu.io/2019/11/2/16e2b26440fc2c3b?w=517&h=289&f=png&s=7335 '描述')
我们可以看出，通过v-model的方式设置一个visible2,通过点击取消和保存事件控制visible2的值，是可以解决单个按钮的Popover弹出框隐藏问题的。
### 在表格中的或者循环多条数据下，Popover弹出框隐藏问题
通过自定义显示与隐藏，可以解决单个按钮的显示与隐藏问题，下面我们试试是否可以解决表格下的多条数据的后按钮的显示与隐藏功能。
```javascript
<el-table :data="gridData">
    <el-table-column
      width="150"
      property="date"
      label="日期"
    ></el-table-column>
    <el-table-column
      width="100"
      property="name"
      label="姓名"
    ></el-table-column>
    <el-table-column
      label="操作"
      width="120"
      fixed="right"
    >
      <template slot-scope="scope">
        <!-- 当资源为2~1000，不能显示操作按钮，且勾选禁用 -->
        <el-popover
          placement="right"
          width="400"
          trigger="manual"
          v-model="visible"
        >
          <el-form
            ref="form"
            label-position="top"
            class="page-form"
            style="margin-bottom: 80px;"
            :model="form"
          >
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.name"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.sex"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button
              size="mini"
              type="text"
              @click="visible = false"
            >取消</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="visible = false"
            >确定</el-button>
          </div>
          <el-button
            slot="reference"
            @click="visible =!visible"
          >click 激活</el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
```
![](https://user-gold-cdn.xitu.io/2019/11/2/16e2b26651b5cb2f?w=641&h=421&f=png&s=12123 '描述')
发现通过处理visible的值，多条数据的按钮会同时显示和隐藏，显然不行了。到这里，我在网上也搜了下，如果可以确定该条数据的唯一性，那应该就可以解决这个问题。
废话不多说，咱还是通过代码来验证：
```javascript
<el-table :data="gridData">
    <el-table-column
      width="150"
      property="date"
      label="日期"
    ></el-table-column>
    <el-table-column
      width="100"
      property="name"
      label="姓名"
    ></el-table-column>
    <el-table-column
      label="操作"
      width="120"
      fixed="right"
    >
      <template slot-scope="scope">
        <!-- 当资源为2~1000，不能显示操作按钮，且勾选禁用 -->
        <el-popover
          placement="top"
          width="400"
          trigger="manual"
          :ref="refNamePopover + scope.row.id"
        >
          <el-form
            ref="form"
            label-position="top"
            class="page-form"
            style="margin-bottom: 80px;"
            :model="form"
          >
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.name"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.sex"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center; margin: 0">
            <el-button
              size="mini"
              type="text"
              @click="cancleAction(scope.row.id)"
            >取消</el-button>
          </div>
          <el-button
            type="primary"
            slot="reference"
            size="mini"
            @click="openAction(scope.row.id)"
          >测试
          </el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
  <script>
    export default {
      name: 'BasicTable',
      data () {
        return {
          refNamePopover: 'popover-', // popover ref名称前缀
          form: {
            name: '',
            sex: '',
            data: ''
          },
          gridData: [{
            date: '2016-05-02',
            name: '哈哈',
            id: '1'
          }, {
            date: '2016-05-04',
            name: '哈哈',
            id: '2'
          }, {
            date: '2016-05-01',
            name: '哈哈',
            id: '3'
          }, {
            date: '2016-05-03',
            name: '哈哈',
            id: '4'
          }]
        }
      },
      methods: {
        cancleAction (id) {
          let refName = this.refNamePopover + id
          this.$refs[refName].doClose()
        },
        openAction (id) {
          let refName = this.refNamePopover + id
          this.$refs[refName].doShow()
        }
      }
    }
</script>
```
![](https://user-gold-cdn.xitu.io/2019/11/2/16e2b26825d6b67a?w=933&h=311&f=png&s=10553 '描述')
通过唯一Id 来控制Popover 弹出框弹出与隐藏，完美的解决了表格或多条数据使用Popover 弹出框弹出与隐藏的问题。以上归纳，也参考了很多博主和官网的见解，在这再次感谢。希望这些归纳能让你跟好的使用Popover 弹出框.
### 解决遗留问题
有博主提出，上测实例会出现多个弹框的情况，我试了下，的确是个问题。下面是这个问题的解决办法：
```javascript
<el-table :data="gridData">
    <el-table-column
      label="操作"
      width="120"
      >
      <template slot-scope="scope">
        <!-- 当资源为2~1000，不能显示操作按钮，且勾选禁用 -->
        <el-popover
          :ref="refNamePopover + scope.row.id"
          placement="left"
          width="400"
          trigger="click"
        >
          <el-form
            ref="form"
            label-position="top"
            class="page-form"
            style="margin-bottom: 80px;"
            :model="form"
          >
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.name"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="车位名称"
              prop="name"
            >
              <el-input
                v-model.trim="form.sex"
                tips-placement="top-start"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="cancleAction(scope.row.id)"
          >取消</el-button>
          <el-button
            type="iconButton"
            slot="reference"
            :title="$t('vms.ui.device.edit')"
          >
            <i class="h-icon-edit"></i>
          </el-button>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
```
script里的内容不变，通过trigger="click"，这样当点击下个按钮时，这个popover弹框就会被隐藏。这样就不会出现多个弹框的情况。同样点击取消时，也可以关闭弹框。注：当el-table-column中加入fixed="right"属性时，固定按钮在右侧，点击取消时就不能关闭弹框了，我也试了很久，解决办法还在研究中，希望大牛知指导