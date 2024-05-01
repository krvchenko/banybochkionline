<template>
	<div class="contacts-info">
		<h1 class="contacts-info__title test">Контакты</h1>
		<div class="dl-horizontal">
			<dt>Наш адрес:</dt>
			<dd>Постоянная выставка находятся в Вологде.</dd>
			<dd>Россия, Вологодская область, г. Вологда, ул. Вологодская Слобода, д.4</dd>
			<dt>Телефон:</dt>
			<dd>
				<a href="tel:88002224261" class="phone">8 800 222 42 61</a>
				<br>
				<a href="tel:+79517438958" class="phone">+7(951)743-89-58</a>
			</dd>
			<dt>Viber:</dt>
			<dd><a href="viber://add?number=79517438958" target="_blank">+7(951)743-89-58</a></dd>
			<dt>Whatsapp:</dt>
			<dd><a href="https://api.whatsapp.com/send?phone=79215396303" target="_blank">+7(921)539-63-03</a></dd>
			<dt>E-mail:</dt>
			<dd><a href="mailto:region35les@mail.ru" target="_blank">region35les@mail.ru</a></dd>
			<h4>Реквизиты</h4>
			<dt>Организация:</dt>
			<dd>ООО «Бани бочки онлайн»</dd>
			<dt>Юр. адрес:</dt>
			<dd>1600515, Вологодская обл., Вологодский район, пос. Семенково, пер. Октябрьский, д.6</dd>
			<dt>ОГРН:</dt>
			<dd>1183525001098</dd>
			<dt>ИНН:</dt>
			<dd>3507313856</dd>
			<dt>КПП:</dt>
			<dd>350701001</dd>
			<dt>Сертификаты:</dt>
			<dd>
				<a href="https://api.banybochkionline.ru/images/certificate-5.jpg" target="_blank">Сертификат соответствия</a>
				<br>
				<a href="https://api.banybochkionline.ru/uploads/registration-cert.jpg" target="_blank">Свидетельство на товарный знак</a>
			</dd>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Info',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.contacts-info {
		position: relative;
		z-index: 10;
		padding: 30px;
		background: #fff;
		@include mq('tablet') {
			padding: 0;
			margin: 0;
		}
		&__title {
			margin: 0 0 30px 0;
			font-size: 32px;
			font-weight: 700;
			@include mq('tablet') {
				margin: 30px 0;
				text-align: center;
			}
		}
		dt {
			text-align-last: left;
			@include mq('mobile', 'min') {
				width: auto;
				float: left;
				width: 160px;
				overflow: hidden;
				clear: left;
				text-align: right;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-weight: 700;
			}
		}

		dd {
			@include mq('mobile', 'min') {
				margin-left: 180px;
				margin-bottom: 10px;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>