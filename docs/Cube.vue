<template>
	<div style="height: 23px" v-for="row in canvas">
		<div class="block" :style="{ backgroundColor: !item ? 'white' : 'black' }" v-for="item in row"></div>
	</div>
</template>

<script>
const cubes = [
	[[0, 7], [1, 7], [2, 7], [3, 7]], // l
	[[0, 7], [1, 7], [2, 7], [2, 6]], // j
	[[0, 7], [1, 7], [2, 7], [2, 8]], // L
	[[0, 7], [1, 7], [1, 8], [2, 8]], // z
	[[0, 7], [1, 7], [1, 6], [2, 6]], // s
	[[0, 7], [1, 7], [1, 8], [1, 6]], // t
	[[0, 7], [0, 8], [1, 7], [1, 8]], // o
]

export default {
	data() {
		const width = 15
		const height = 30
		let canvas = []
		for (let i = 0; i < height; i++) {
			canvas.push([])
			for (let j = 0; j < width; j++) {
				canvas[i].push(0)
			}
		}

		return {
			canvas: canvas,
			activeCube: null,
			tempType: null,
			movement: null
		}
	},

	watch: {
		activeCube: {
			handler(newVal) {
				newVal.forEach((item) => {
					this.canvas[item[0]][item[1]] = 1
				})
			},
			deep: true
		}
	},

	methods: {
		randomInitCube() {
			// cubes 中任意选一个
			this.tempType = Math.floor(Math.random() * cubes.length)
			const newCubes = JSON.parse(JSON.stringify(cubes[this.tempType]))

			for (const item of newCubes) {
				if (this.canvas[item[0]][item[1]]) {
					alert('game over')
					clearInterval(this.movement)
					return
				}
			}

			this.activeCube = newCubes
		},

		validCubes(newCubes) {
			for (const item of newCubes) {
				// 行数超出，列数超出，碰到黑色且不在activeCube中的方块
				if (item[0] >= this.canvas.length || item[1] < 0 || item[1] >= this.canvas[0].length || (this.canvas[item[0]][item[1]] && !JSON.stringify(this.activeCube).includes(JSON.stringify(item)))) {
					return false
				}
			}
			return true
		},

		updateCube(newCubes) {
			this.activeCube.forEach((item) => {
				this.canvas[item[0]][item[1]] = 0
			})

			this.activeCube = newCubes
		},

		move(direction) { // 1 right, -1 left, 0 down // 一旦触地就完全不能动要不要做
			const newCubes = JSON.parse(JSON.stringify(this.activeCube)).map((item) => {
				if (direction) {
					item[1] += direction
				}
				else {
					item[0] += 1
				}
				return item
			})


			if (this.validCubes(newCubes)) {
				this.updateCube(newCubes)
			}
			else {
				if (!direction) {
					// 检测有没有能消掉的行
					let fullIndex = []

					this.canvas.forEach((item, index) => {
						if (item.indexOf(0) == -1) {
							fullIndex.push(index)
						}
					})

					this.canvas = this.canvas.filter((item, index) => {
						return fullIndex.indexOf(index) == -1
					})

					fullIndex.forEach(() => {
						this.canvas.unshift([])
						for (let i = 0; i < this.canvas[1].length; i++) {
							this.canvas[0].push(0)
						}
					})
					this.randomInitCube()
				}
			}
		},

		rotate() {
			// TODO: 旋转activeCube
			const newCubes = JSON.parse(JSON.stringify(this.activeCube))

			if (this.validCubes(newCubes)) {
				this.updateCube(newCubes)
			}
		}
	},

	mounted() {
		document.addEventListener('keydown', (event) => {
			if (event.key == 'ArrowRight') {
				this.move(1)
			}
			if (event.key == 'ArrowLeft') {
				this.move(-1)
			}
			if (event.key == 'ArrowDown') {
				this.move(0)
			}
			if (event.key == ' ') {
				this.rotate()
			}
		})

		this.randomInitCube()

		this.movement = setInterval(() => this.move(0), 500)
	}
}
</script>

<style>
.block {
	border: solid;
	border-color: black;
	width: 20px;
	height: 20px;
	display: inline-block;
}
</style>



