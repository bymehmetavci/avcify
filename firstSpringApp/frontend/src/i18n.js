import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up' : 'Sign Up',
                'Password mismatch' : 'Password mismatch',
                'Username' : 'Username',
                'Display Name' : 'Display Name',
                'Password' : 'Password',
                'Password Repeat' : 'Password Repeat',
                'Login' : 'Login',
                'Logout' : 'Logout',
                'Email' : 'Email',
                'User' : 'User',
                'Users' : 'Users',
                'Next' : 'next >',
                'Previous' : '< previous',
                'Load Failure' : 'Load Failure',
                'User not found' : 'User not found',
                'Edit' : 'Edit',
                'Change Display Name' : 'Change Display Name',
                'Save' : 'Save',
                'Cancel' : 'Cancel',
                'My Profile' : 'My Profile',
                'There are no announcements in your timeline' : 'There are no announcements in your timeline',
                'Load old announcements' : 'Load old announcements',
                'There are new announcements' : 'There are new announcements'
            }
        },
        tr: {
            translations: {
                'Sign Up' : 'Kayıt Ol',
                'Password mismatch' : 'Her iki şifre de aynı olmalı',
                'Username' : 'Kullanıcı Adı',
                'Display Name' : 'Tercih Edilen İsim',
                'Password' : 'Şifre',
                'Password Repeat' : 'Şifreyi Tekrarla',
                'Login' : 'Giriş Yap',
                'Logout' : 'Çıkış',
                'Email' : 'E-Posta',
                'User' : 'Kullanıcı',
                'Users' : 'Kullanıcılar',
                'Next' : 'sonraki >',
                'Previous' : '< önceki',
                'Load Failure' : 'Liste alınamadı',
                'User not found' : 'Kullanıcı bulanamadı',
                'Edit' : 'Düzenle',
                'Change Display Name': 'Görünür İsmi Düzenle',
                'Save' : 'Kaydet',
                'Cancel' : 'İptal Et',
                'My Profile' : 'Hesabım',
                'There are no announcements in your timeline' : 'Zaman çizelgenizde ilan bulunamadı',
                'Load old announcements' : 'Önceki ilanları yükle',
                'There are new announcements' : 'Yeni bir ilan var'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

const timeagoTR = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }
  register('tr', timeagoTR);

export default i18n;