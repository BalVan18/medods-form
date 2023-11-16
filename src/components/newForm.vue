<template>
    <form class="form" @submit=submitHandler()>
        <h3 class="title">Укажите ваше ФИО</h3>
        <div class="form__wrap form-wrap--flex">
            <div class="form-wrap-name form-wrap__name flex">
                <input class="form-input" name="last-name" id="" placeholder="Фамилия*" v-model.trim="last_name" @input="validator($event.target)" :class="{ 'invalid': $v.last_name.$error }">
                <small class="invalid-text invalid-text--bottom" v-if="$v.last_name.$error">Введите фамилию</small>
            </div>
            <div class="form-wrap-name form-wrap__name flex">
                <input class="form-input" name="first-name" placeholder="Имя*" v-model.trim="first_name" @input="validator($event.target)" :class="{ 'invalid': $v.first_name.$error }">
                <small class="invalid-text invalid-text--bottom" v-if="$v.first_name.$error">Введите имя</small>
            </div>
            <input class="form-wrap__input form-input" name="middle-name" placeholder="Отчество" v-model.trim="$v.middle_name">
        </div>
        <div class="form__wrap form-wrap--flex">
            <label class="form-wrap__label form-wrap-label label">Дата рождения*
                <input class="form-input" name="birth-date" type="date" v-model="birth_date" @input="validator($event.target)" :class="{ 'invalid': $v.birth_date.$error }">
                <small class="invalid-text" v-if="$v.birth_date.$error">Укажите дату</small>
            </label>
            <label class="form-wrap__label form-wrap-label label">Номер телефона*
                <input class="form-input" name="tel" type="tel" placeholder="79917762642" v-model.trim="tel" @input="validator($event.target)" :class="{ 'invalid': $v.tel.$error }">
                <small class="invalid-text" v-if="$v.tel.$error && !$v.tel.required">Введите номер телефона</small>
                <small class="invalid-text" v-else-if="$v.tel.$error && !$v.tel.checkFirstLetter">Введите с цифры 7</small>
                <small class="invalid-text" v-else-if="$v.tel.$error && (!$v.tel.minLength || !$v.tel.telPatern)">Номер телефона должен содержать {{ $v.tel.$params.minLength.min }} цифр</small>
                <small class="invalid-text" v-else-if="$v.tel.$error && (!$v.tel.maxLength || !$v.tel.telPatern)">Некорректный формат телефона</small>
            </label>
            <div class="form-wrap__gender form-wrap-gender flex">
                <h3 class="form-wrap-gender__label label">Укажите ваш пол</h3>
                <label class="form-wrap-gender__text flex">Мужчина
                    <input class="form-wrap-gender__input" type="radio" name="gender" value="мужчина">
                </label>
                <label class="form-wrap-gender__text flex">Женщина
                    <input class="form-wrap-gender__input" type="radio" name="gender" value="женщина">
                </label>
            </div>
        </div>
        <div class="form__wrap form-wrap--align-end form-wrap--flex">
            <label class="form-wrap__label label">Группа клиентов*
                <select class="form-wrap__select form-input" name="client-group" multiple size="3" v-model="$v.client_group.$model" :class="{ 'invalid': $v.client_group.$error }">
                    <option class="form-wrap-select__option" v-for="option in options.option1" :value="option" :key="option">{{ option }}</option>
                </select>
                <small class="invalid-text" v-if="$v.client_group.$error">Выберите группу</small>
            </label>
            <label class="form-wrap__label label">Лечащий врач
                <select class="form-wrap__select form-input" name="doctor">
                    <option v-for="option in options.option2" :value="option" :key="option">{{ option }}</option>
                </select>
            </label>
            <label class="form-wrap__label label">Не отправлять СМС
                <input name="sms" type="checkbox">
            </label>
        </div>
        <div class="form__wrap" >
            <h3 class="title">Адрес:</h3>
            <div class="form-wrap__address form-wrap-address flex">
                <input class="form-input form-wrap-address__input form-input--no-margin" name="index" placeholder="Индекс">
                <input class="form-input form-wrap-address__input form-input--no-margin" name="country" placeholder="Страна">
                <input class="form-input form-wrap-address__input form-input--no-margin" name="region" placeholder="Область">
                <div class="form-wrap-address__city flex">
                    <input class="form-input form-input--no-margin" name="city" placeholder="Город*" v-model="city" @input="validator($event.target)" :class="{ 'invalid': $v.city.$error }">
                    <small class="invalid-text invalid-text--bottom" v-if="$v.city.$error && !$v.city.cityPatern">Введите город</small>
                </div>
                <input class="form-input form-wrap-address__input form-input--no-margin" name="street" placeholder="Улица">
                <input class="form-input form-wrap-address__input form-input--no-margin" name="building" placeholder="Дом">
            </div>
        </div>
        <div class="form__wrap">
            <div class="form-wrap-row flex">
                <label class="form-wrap__label label">Тип документа*
                    <select name="document-type" class="form-input" @change="validator($event.target)">
                        <option v-for="option in options.option3" :value="option" :key="option">{{ option }}</option>
                    </select>
                </label>
                <label class="form-wrap__label label">Дата выдачи*
                    <input class="form-input" type="date" name="document-date" v-model="document_date" @input="validator($event.target)" :class="{ 'invalid': $v.document_date.$error }">
                    <small class="invalid-text" v-if="$v.document_date.$error">Укажите дату</small>
                </label>
            </div>
            <div class="form-wrap-row form-wrap-row--bottom flex">
                <input class="form-input" name="series" placeholder="Серия">
                <input class="form-input" name="number" placeholder="Номер">
                <input class="form-input" name="granted" placeholder="Кем выдан">
            </div>
        </div>
        <div class="form__footer form-footer flex">
            <p class="form-footer__text form-footer-text">*Поля обязательные для заполнения.</p>
            <button class="form-footer__btn form-footer-btn" :disabled="$v.$invalid" type="submit">Отправить</button>
        </div>
    </form>
</template>

<script>
import { required, minLength,maxLength} from 'vuelidate/lib/validators'

const letterPatern = (/^[а-яА-ЯёЁa-zA-Z]+$/);

export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            birth_date: '',
            tel: '',
            client_group: [],
            city: '',
            document_type: '',
            document_date: ''
        }
    },
    validations: {
        first_name: { 
            required, 
            patern: (value) => letterPatern.test(value)
        },
        last_name: { 
            required, 
            patern: (value) => letterPatern.test(value)
        },
        birth_date: { required },
        tel: { 
            required,
            minLength: minLength(11),
            maxLength: maxLength(11),
            checkFirstLetter: (value) => value[0] === '7',
            telPatern: (value) => (/^[0-9]+$/).test(value),
        },
        client_group: { required },
        city: { 
            required, 
            patern: (value) => letterPatern.test(value)
        },
        document_type: { required },
        document_date: { required }
    },
    methods: {
        submitHandler() {
            if (!this.$v.$invalid) {
                alert('Новый клиент успешно создан!')
            }
        },
        validator(target) {
            switch(target.name) {
                case "document-date": 
                    this.document_date = target.value
                    this.$v.document_date.$touch()
                    break

                case "document-type": 
                    this.document_type = target.value
                    this.$v.document_type.$touch()
                    break

                case "city": 
                    this.city = target.value
                    this.$v.city.$touch()
                    break

                case "tel": 
                    this.tel = target.value
                    this.$v.tel.$touch()
                    break

                case "birth-date": 
                    this.birth_date = target.value
                    this.$v.birth_date.$touch()
                    break

                case "last-name": 
                    this.last_name = target.value
                    this.$v.last_name.$touch()
                    break

                case "first-name": 
                    this.first_name = target.value
                    this.$v.first_name.$touch()
                    break
            }
        }
    },
    
    setup() {
        const options = {
            option1: {
                1: 'VIP',
                2: 'Проблемные',
                3: 'ОМС'
            },

            option2: {
                1: 'Иванов',
                2: 'Захаров',
                3: 'Чернышёва'
            },

            option3: {
                1: 'Паспорт',
                2: 'Свидетельство о рождении',
                3: 'Вод. удостоверение'
            }
        }
        
        return {
            options,
        }
    }
}

</script>

<style lang="sass">
</style>