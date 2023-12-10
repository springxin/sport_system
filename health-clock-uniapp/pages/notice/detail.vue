<template>
	<view class="oa-notice-detail">

		<view class="article-meta">
			<text class="article-author">{{announceDetail.createBy}}</text>
			<text class="article-text">发布于</text>
			<text class="article-time">{{announceDetail.createTime}}</text>
		</view>
		<view class="article-content">
			<oa-parser lazy-load :html="announceDetail.noticeTitle"></oa-parser>
		</view>
	</view>
</template>

<script>
	import oaParser from '@/components/oa-parser';
	export default {
		components: {
			oaParser,
		},
		data() {
			return {
				announceDetail: {},
			};
		},
		
		onLoad(e) {
			console.log(e)
			this.announceDetail = JSON.parse(e.item)
		},

		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},


	};
</script>

<style lang="scss">
	.oa-notice-detail {
		.banner {
			overflow: hidden;
			position: relative;
			background-color: #ccc;

			.banner-img {
				height: 300upx;
				width: 100%;
			}

			.banner-title {
				max-height: 84upx;
				overflow: hidden;
				position: absolute;
				bottom: 0;
				width: 100%;
				font-size: 32upx;
				font-weight: 400;
				line-height: 42upx;
				color: white;
				z-index: 11;
				background-color: rgba(0, 0, 0, 0.25);
				padding: 4upx 20upx;
			}
		}

		.banner-title {
			padding: $spacing-lg $spacing-lg 0;
			font-size: $font-lg;
		}

		.article-meta {
			padding: 20upx 30upx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			color: gray;

			.article-text {
				font-size: 30upx;
				margin: 0 20upx;
			}

			.article-author,
			.article-time {
				font-size: 30upx;
			}
		}

		.article-content {
			padding: 0 30upx;
			overflow: hidden;
			font-size: 30upx;
			margin-bottom: 30upx;
		}
	}
</style>
