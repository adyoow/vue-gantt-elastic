import dayjs from "dayjs"
// import { tasks } from "./task"

// just helper to get current dates
function getDate(hours) {
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth()
	const currentDay = currentDate.getDate()
	const timeStamp = new Date(
		currentYear,
		currentMonth,
		currentDay,
		0,
		0,
		0
	).getTime()
	return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}
const tasks = [
	{
		id: 1,
		taskName: "Make some noise",
		userRole:
			'<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
		plannedStart: getDate(-24 * 5),
		duration: 15 * 24 * 60 * 60 * 1000,
		percent: 85,
		type: "project"
		//collapsed: true,
	},
	{
		id: 2,
		taskName: "With great power comes great responsibility",
		userRole:
			'<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
		parentId: 1,
		plannedStart: getDate(-24 * 4),
		duration: 4 * 24 * 60 * 60 * 1000,
		percent: 50,
		type: "milestone",
		collapsed: true,
		style: {
			base: {
				fill: "#1EBC61",
				stroke: "#0EAC51"
			}
		}
	},
	{
		id: 3,
		taskName: "Courage is being scared to death, but saddling up anyway.",
		userRole:
			'<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
		parentId: 2,
		plannedStart: getDate(-24 * 3),
		duration: 2 * 24 * 60 * 60 * 1000,
		percent: 100,
		type: "task",
		collapsed: true
	},
	{
		id: 4,
		taskName: "Wow!!",
		userRole: "John Wayne",
		parentId: 3,
		plannedStart: getDate(-24 * 3),
		duration: 2 * 24 * 60 * 60 * 1000,
		percent: 100,
		type: "task"
	},
	{
		id: 5,
		taskName: "Wow!!",
		userRole: "John Wayne",
		plannedStart: getDate(24 * 3),
		duration: 2 * 24 * 60 * 60 * 1000,
		percent: 100,
		type: "task"
	},
	{
		id: 6,
		taskName: "Wow!!",
		userRole: "John Wayne",
		plannedStart: getDate(-24 * 5),
		duration: 2 * 24 * 60 * 60 * 1000,
		percent: 100,
		type: "task"
	}
]

const options = {
	taskMapping: {
		progress: "percent",
		start: "plannedStart",
    label: 'taskName'
	},
	maxRows: 100,
	maxHeight: 900,
	title: {
		label: "Your project title as html (link or whatever...)",
		html: false
	},
	row: {
		height: 24
	},
	times: {
		timeScale: 24 * 60 * 1000,
		timeZoom: 4, //*
		timePerPixel: 0,
		firstTime: new Date("2022-1-1").getTime().valueOf(),
		lastTime: new Date("2023-12-31").getTime().valueOf(),
		firstTaskTime: new Date("2023-3-1").getTime().valueOf(),
		lastTaskTime: new Date("2023-11-30").getTime().valueOf(),
		totalViewDurationMs: 0,
		totalViewDurationPx: 0,
		stepDuration: "day"
	},
	calendar: {
		month: {
			display: false
		},
		day: {
			display: true
		},
		hour: {
			display: false
		}
	},
	chart: {
		progress: {
			bar: true
		},
		expander: {
			display: true
		}
	},
	taskList: {
		display: true, //*
		resizeAfterThreshold: false, //*
		widthThreshold: 75, //*
		expander: {
			straight: false
		},
		columns: [
			{
				id: 1,
				label: "ID",
				value: "id",
				width: 40,
				// customSlot: 'id',
				display: true
			},
			{
				id: 2,
				label: "阶段任务",
				value: "taskName",
				width: 70,
				expander: true,
				html: true,
				keyword: true,
				events: {
					click({ data, column }) {
						alert("description clicked!\n" + data.label + "in line" + column)
					}
				},
				display: true
				// customSlot: 'taskName'
			},
			{
				id: 3,
				label: "角色",
				value: "userRole",
				width: 100,
				html: true,
				customSlot: "userRole",
				display: true
			},
			{
				id: 4,
				label: "计划开始时间",
				value: (task) => dayjs(task.plannedStart).format("YYYY-MM-DD"),
				width: 178,
				customSlot: "plannedStart",
				display: true
			},
			{
				id: 5,
				label: "计划结束时间",
				value: (task) => dayjs(task.plannedEnd).format("YYYY-MM-DD"),
				width: 78,
				customSlot: "plannedEnd",
				display: true
			},
			// {
			//   id: 6,
			//   label: "实际开始时间",
			//   value: task => dayjs(task.actualStart).format("YYYY-MM-DD"),
			//   width: 78,
			//   customSlot: 'actualStart'
			// },
			// {
			//   id: 7,
			//   label: "实际结束时间",
			//   value: task => dayjs(task.actualEnd).format("YYYY-MM-DD"),
			//   width: 78,
			//   customSlot: 'actualEnd'
			// },
			{
				id: 8,
				label: "类型",
				value: "type",
				width: 68,
				customSlot: "type",
				display: true
			},
			{
				id: 9,
				label: "%",
				value: "progress",
				width: 35,
				customSlot: "progress",
				display: true,
				style: {
					"task-list-header-label": {
						"text-align": "center",
						width: "100%"
					},
					"task-list-item-value-container": {
						"text-align": "center",
						width: "100%"
					}
				}
			}
		]
	},
	locale: {
		name: "zh",
		Now: "当前时间",
		"X-Scale": "宽",
		"Y-Scale": "高",
		"Task list width": "列头宽度",
		"Before/After": "时间跨度",
		"Display task list": "显示列头",
		weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		months: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		]
	}
}

export { getDate, tasks, options }
