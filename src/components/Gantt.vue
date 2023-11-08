<template>
	<q-page class="q-pa-sm">
		<gantt-elastic
			ref="ganttRef"
			:options="options"
			:tasks="tasks"
			:dynamicStyle="dynamicStyle"
			@tasks-changed="tasksUpdate"
			@options-changed="optionsUpdate"
			@dynamic-style-changed="styleUpdate"
		>
			<template slot="header">
				<gantt-header> </gantt-header>
				<q-btn
					v-for="item in btnList"
					:key="item.type"
					:label="item.label"
					icon="mdi-plus"
					@click="addItem(item)"
				/>
				<!-- <q-btn :label="'打印'" icon="mdi-plus" @click="print" /> -->
				<el-select v-model="timeScale" placeholder="请选择">
					<el-option
						v-for="item in scaleList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
				<ul style="list-style: none;display: flex;">
					<template v-for="item in options.taskList.columns">
						<div :key="item.id" style="display:flex">
							<input type="checkbox" v-model="item.display" />
							<li style="margin: 0 10px;">
								{{ item.label }}
							</li>
						</div>
					</template>
				</ul>
			</template>
			<!-- <template v-slot:taskName>
				<div>
          自定义taskName
        </div>
			</template> -->
			<template v-slot:userRole>
				<div>
					userRole
				</div>
			</template>
			<template v-slot:plannedStart="scopeSlot">
				<div @click="startClick">
					{{ formatDate(scopeSlot.row.plannedStart) }}
				</div>
			</template>
			<template slot="footer">
				<custom-block></custom-block>
			</template>
		</gantt-elastic>
		<div class="q-mt-md" id="addHere" />
	</q-page>
</template>

<style></style>

<script>
import GanttElastic from "gantt-elastic"
import GanttHeader from "gantt-elastic-header"
import CustomBlock from "./custom-block.vue"
import { getDate, tasks, options } from "./mock-task.js"
import dayjs from "dayjs"

export default {
	name: "Gantt",
	components: {
		GanttElastic,
		GanttHeader,
		CustomBlock
	},
	data() {
		return {
			scaleList: [
				{
					label: "年",
					value: "year"
				},
				{
					label: "月",
					value: "month"
				},
				{
					label: "日",
					value: "day"
				}
				// {
				// 	label: "小时",
				// 	value: "hour"
				// }
			],
			tasks,
			options,
			dynamicStyle: {},
			lastId: 16,
			btnList: [
				{
					type: "project",
					label: "Add project"
				},
				{
					type: "milestone",
					label: "Add milestone"
				},
				{
					type: "group",
					label: "Add group"
				},
				{
					type: "task",
					label: "Add task"
				}
			]
		}
	},
	computed: {
		timeScale: {
			get: function() {
				if (this.options.times.timeScale === 365 * 30 * 24 * 60 * 1000) {
					return "年"
				} else if (this.options.times.timeScale === 30 * 24 * 60 * 1000) {
					return "月"
				} else if (this.options.times.timeScale === 24 * 60 * 1000) {
					return "日"
				}
				return ""
			},
			set: function(timeScale) {
				if (timeScale === "year") {
					this.options.calendar.month.display = false
					this.options.calendar.day.display = false
					this.options.calendar.hour.display = false
					this.options.times.timeZoom = 30
					this.options.times.timeScale = 365 * 30 * 24 * 60 * 1000
					this.options.times.stepDuration = "year"
				} else if (timeScale === "month") {
					this.options.calendar.month.display = true
					this.options.calendar.day.display = false
					this.options.calendar.hour.display = false
					this.options.times.timeZoom = 1
					this.options.times.timeScale = 30 * 24 * 60 * 1000
					this.options.times.stepDuration = "month"
				} else if (timeScale === "day") {
					this.options.calendar.month.display = false
					this.options.calendar.day.display = true
					this.options.calendar.hour.display = false
					this.options.times.timeZoom = 4
					this.options.times.timeScale = 24 * 60 * 1000
					this.options.times.stepDuration = "day"
				}
			}
		}
	},
	methods: {
		addItem(item) {
      const random = parseInt(Math.random() * 10)
      const plannedStart = getDate(24 * random)
			this.tasks.push({
				type: item.type,
				id: this.lastId++,
				user: "localhost",
				plannedStart,
				duration: 10 * 24 * 60 * 60 * 1000,
				percent: 30
			})
		},
		tasksUpdate() {
			// debugger
			// eslint-disable-next-line no-console
			// console.log('tasksUpdate', tasks)
			// this.tasks = tasks
		},
		optionsUpdate(options) {
			// eslint-disable-next-line no-console
			// console.log('optionsUpdate', options)
			this.options = options
		},
		styleUpdate(style) {
			// eslint-disable-next-line no-console
			// console.log('styleUpdate', style)
			this.dynamicStyle = style
		},
		startClick() {
			console.log("startClick")
		},
		print() {
			// eslint-disable-next-line no-debugger
			debugger
			let element = document.querySelector(".gantt-elastic__main-view")

			// 获取元素的大小和位置
			var rect = element.getBoundingClientRect()

			// 计算元素在画布上的位置和大小
			var canvasWidth = 300 // 画布的宽度
			var canvasHeight = 200 // 画布的高度
			var scaleX = canvasWidth / rect.width
			var scaleY = canvasHeight / rect.height
			var scale = Math.min(scaleX, scaleY)
			var newWidth = rect.width * scale
			var newHeight = rect.height * scale
			var newX = (canvasWidth - newWidth) / 2
			var newY = (canvasHeight - newHeight) / 2

			// 获取元素的HTML结构
			var html = element.outerHTML

			// 将元素绘制到画布上
			var canvas = document.createElement("canvas")
			canvas.width = canvasWidth
			canvas.height = canvasHeight
			var context = canvas.getContext("2d")
			var image = new Image()
			image.onload = function() {
				context.drawImage(image, newX, newY, newWidth, newHeight)
				var dataUrl = canvas.toDataURL("image/png")
				var img = new Image()
				img.src = dataUrl
				img.onload = function() {
					// 保存图片到文件
					var link = document.createElement("a")
					link.href = img.src
					link.download = "screenshot.png"
					link.click()
				}
			}
			image.src = "data:text/html;charset=utf-8," + encodeURIComponent(html)
		},
		formatDate(timestamp) {
			return dayjs(timestamp).format("YYYY-MM-DDTHH:mm:ss")
		}
	}
}
</script>
