<template>
	<div class="dropdown"
		:class="{opened: isDropDownOpened}"
	>
		<div class="dropdown-header"
			@click="toggleView"
		>
			<div class="dropdown-header-icon">
				<img
					:src="require(`@/assets/icons/${icon}`)"
					alt="icon"
					class="dropdown-header-icon-img"
				>
			</div>
			<div class="dropdown-header-title">
				{{ title }}
			</div>
			<div class="dropdown-header-chevron">
				<img
					src="@/assets/icons/chevron-right.svg"
					alt="icon"
					class="dropdown-header-chevron-img"
					:class="{opened: isDropDownOpened}"
				>
			</div>
		</div>

		<div class="dropdown-items"
			:class="{opened: isDropDownOpened}"
		>
			<div
				v-for="(listItem, i) in dropDownItemsList"
				:key="i"
				class="dropdown-items-item"
				@click="checkListItem(listItem, i)"
			>
				<div v-if="!checkboxes" class="dropdown-items-item-nocheckboxed">
					<span class="dropdown-items-item-nocheckboxed-title">{{ listItem.title }} </span>
					(<span class="dropdown-items-item-nocheckboxed-counter">{{ listItem.count }}</span>)
				</div>
				<div v-else class="dropdown-items-item-checkboxed"
					:class="{checked: listItem.checked}"
				>
					<div class="dropdown-items-item-checkboxed-checkbox"
						:class="{checked: listItem.checked}"
					>
						<img src="@/assets/icons/checked-checkbox-96.png" alt="checkbox_checked"
							class="dropdown-items-item-checkboxed-checkbox-checked"
							v-if="listItem.checked"
						>
						<img src="@/assets/icons/rectangle 21.svg" alt="checkbox"
							class="dropdown-items-item-checkboxed-checkbox-nochecked"
							v-else
						>
					</div>
					<span class="dropdown-items-item-checkboxed-title">{{ listItem.title }} </span>
					(<span class="dropdown-items-item-checkboxed-counter">{{ listItem.count }}</span>)
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>

export default {
	name: 'Dropdown',
	data: () => ({
		dropDownOpened: null,
		localList: []
	}),
	props: {
		list: Array,
		checkboxes: {
			type: Boolean,
			default: false
		},
		opened: {
			type: Boolean,
			default: false
		},
		title: String,
		icon: String
	},
	methods: {
		toggleView(){
			this.dropDownOpened = !this.dropDownOpened;
		},
		checkListItem(item, i){
			this.localList[i].checked = !this.localList[i].checked;
			item.checked = this.localList[i].checked;

			this.$emit('checked', item);
		}
	},
	computed: {
		isDropDownOpened(){
			return this.dropDownOpened !== null ? this.dropDownOpened : this.opened;
		},
		dropDownItemsList(){
			return this.localList;
		}
	},
	watch: {
		opened(){
			this.dropDownOpened = this.opened;
		},
		list(){
			this.localList = this.list;
		}
	},
	created(){
		this.dropDownOpened = this.opened;
		this.localList = this.list;
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.dropdown {
		width: 248px;
		min-height: 40px;
		background-color: #e6e6e6;
		margin: 15px;
		border-radius: 10px;

		@include mobile {
			width: 100%;
			border-radius: 0px;
			margin: 0px;
		}

		&-header {
			display: flex;
			align-items: center;
			position: relative;

			height: 40px;

			padding-left: 15px;

			&-icon {
				&-img {
					margin-top: 5px;
					width: 20px;
					height: 20px;
				}
			}

			&-title {
				margin-top: 3px;
				color: #232323;
				font-size: 14px;
				font-weight: bold;
				text-transform: uppercase;
				margin-left: 10px;
			}

			&-chevron {
				position: absolute;
				right: 20px;

				&-img {
					width: 10px;
					height: 12px;
					transition: $global-animations-fast;
					transform: rotate(-90deg);
					margin-top: 6px;

					&.opened {
						transform: rotate(0deg);
						transition: $global-animations-fast;
					}
				}
			}
		}

		&-items {
			display: none;
			overflow: hidden;
			background-color: #fff;

			border: 1px solid #e6e6e6;
			margin-top: -1px;
			border-radius: 0 0 10px 10px;

			padding: 15px 0 15px 16px;

			&.opened {
				display: block;
				opacity: 1;
				min-height: 179px;
				height: unset;
				transition: height $global-animations-slow;
			}

			
			&-item {
				cursor: pointer;

				&-checkboxed {
					display: flex;

					&.checked {
						color: $global-colors-pink;
					}

					&-checkbox {
						margin-right: 6px;
						margin-bottom: 10px;

						&-nochecked {
							width: 16px;
							height: 16px;
						}

						&-checked {
							width: 16px;
							border-radius: 3px;
							height: 16px;
						}
					}

					font-size: 14px;
					font-weight: 300;
					
					&-title {
						margin-right: 4px;
					}
				}

				&-nocheckboxed {
					margin-bottom: 12px;
					font-size: 14px;
					font-weight: 300;

					
				}
			}
		}
	}

</style>