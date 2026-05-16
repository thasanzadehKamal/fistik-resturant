import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  ChevronRight,
  Search,
  Sun,
  Moon,
  ExternalLink,
  ArrowUpRight,
  Instagram,
  Facebook,
  Truck,
  Coffee,
  Utensils,
  Smartphone,
  ParkingCircle,
  CheckCircle2
} from 'lucide-react';

// Import local assets
import heroImg from './assets/hero.png';
const ownerInterior = 'https://lh3.googleusercontent.com/p/AF1QipOz-aZonlEH23ugJAJmO4vtfFK7sznxxKrhlgjI=s0';
const ownerTable = 'https://lh3.googleusercontent.com/p/AF1QipMLkCDAfrSFpRSlp-u1Fne77W8fVhLD2rpXuCqr=s0';
const ownerFood1 = 'https://lh3.googleusercontent.com/p/AF1QipPvBlzqs4ykrAYifHqn3DHRPEKqe80diR0_Q7Ak=s0'; // This is the 'katlet' or meat dish
const ownerCoffee = 'https://lh3.googleusercontent.com/p/AF1QipMNxlaW2xkTvyHs3cOoeGK5RHF6-PuYdgWALPj4=s0';
import kebabImg from './assets/kebab.png';
import dessertImg from './assets/dessert.png';
import breakfastImg from './assets/breakfast.png';
import galleryHallImg from './assets/gallery-hall.png';
import galleryTablesImg from './assets/gallery-tables.png';
import galleryKitchenImg from './assets/gallery-kitchen.png';
import galleryLightsImg from './assets/gallery-lights.png';

const RESTAURANT_FEATURES = [
  { group: 'Xidmət seçimləri', items: ['Çatdırılma (Wolt)', 'Paketdə götürmə', 'İçəridə yemək'], icon: Truck },
  { group: 'Təkliflər', items: ['Xüsusi nahar otağı', 'Türk qəhvəsi', 'Geniş menyu'], icon: Coffee },
  { group: 'Menyu istiqamətləri', items: ['Lanç menyu', 'Kabablar', 'Dönərlər'], icon: Utensils },
  { group: 'Atmosfer', items: ['Ailəvi və sakit', 'Spirtsiz mühit', 'Tədbirlər üçün rahat'], icon: Users },
  { group: 'Ödənişlər', items: ['NFC ödənişlər', 'Bank kartları', 'Nağd'], icon: Smartphone },
  { group: 'Şərait', items: ['Namaz və dəstəmaz otağı', 'Uşaqlar üçün şərait', 'Rahat parkinq'], icon: ParkingCircle }
];

const WOLT_MENU_LINK = 'https://wolt.com/az/aze/baku/restaurant/fistik?srsltid=AfmBOooRUqB3Ap_4hkNI5WFRULEEdPSAp9tK0LWSDZd5uccSndkbUaZy';

const MENU_CATEGORIES = [
  { id: 'popular', name: 'Ən çox sifariş verilən' },
  { id: 'lanc', name: 'Lanç menyu' },
  { id: 'salatlar', name: 'Salatlar' },
  { id: 'shorbalar', name: 'Şorbalar' },
  { id: 'qarni', name: 'Qarnirlər' },
  { id: 'quzu', name: 'Quzu kababları' },
  { id: 'dana', name: 'Dana kababları' },
  { id: 'toyuq', name: 'Toyuq kababları' },
  { id: 'isti', name: 'İsti yeməklər' },
  { id: 'pizzalar', name: 'Pizzalar' },
  { id: 'burger', name: 'Burgerlər' },
  { id: 'pide', name: 'Pidələr' },
  { id: 'lahmacun', name: 'Lahmacun' },
  { id: 'doner', name: 'Dönərlər' },
  { id: 'desert', name: 'Desertlər' },
  { id: 'icecek', name: 'Soyuq içkilər' },
  { id: 'elave', name: 'Əlavələr' },
  { id: 'fresh', name: 'Təzə sıxılmış meyvə suları' },
  { id: 'special', name: 'Xüsusi təkliflər' }
];

const CATEGORY_IMAGES: Record<string, string> = {
  popular: kebabImg,
  lanc: breakfastImg,
  salatlar: breakfastImg,
  shorbalar: breakfastImg,
  qarni: kebabImg,
  quzu: kebabImg,
  dana: kebabImg,
  toyuq: kebabImg,
  isti: kebabImg,
  pizzalar: breakfastImg,
  burger: kebabImg,
  pide: breakfastImg,
  lahmacun: breakfastImg,
  doner: kebabImg,
  desert: dessertImg,
  icecek: ownerCoffee,
  elave: breakfastImg,
  fresh: ownerCoffee,
  special: kebabImg
};

const TEXT_FIXES: Array<[string, string]> = [
  ['Sad?', 'Sadə'],
  ['?t', 'Ət'],
  [' ?ti', ' əti'],
  ['Don?ri', 'Dönəri'],
  ['Don?r', 'Dönər'],
  ['Cor?kd?', 'Çörəkdə'],
  ['cor?kd?', 'çörəkdə'],
  ['Cor?k', 'Çörək'],
  ['cor?k', 'çörək'],
  ['Lavasda', 'Lavaşda'],
  ['lavasda', 'lavaşda'],
  ['Lavas', 'Lavaş'],
  ['lavas', 'lavaş'],
  ['M?rci', 'Mərci'],
  ['Sorbas?', 'Şorbası'],
  ['sorbas?', 'şorbası'],
  ['Cop Sis', 'Çöp Şiş'],
  ['Kabab?', 'Kababı'],
  ['Tik?', 'Tikə'],
  ['Ac?l?', 'Acılı'],
  ['X?rc?lt?l?', 'Xırçıltılı'],
  ['Bad?mcan', 'Badımcan'],
  ['Salat?', 'Salatı'],
  ['qarg?dal?', 'qarğıdalı'],
  ['yag?', 'yağı'],
  ['r?ngli', 'rəngli'],
  ['bib?r', 'bibər'],
  ['bib?ri', 'bibəri'],
  ['c?f?ri', 'cəfəri'],
  ['kull?m?', 'külləmə'],
  ['duyu', 'düyü'],
  ['sogan', 'soğan'],
  ['t?z?', 'təzə'],
  ['Kok', 'Kök'],
  ['kok', 'kök'],
  ['Koft?', 'Köftə'],
  ['salcas?', 'salçası'],
  ['nan?', 'nanə'],
  ['Suzm?', 'Süzmə'],
  ['suyud', 'şüyüd'],
  ['q?rm?z?', 'qırmızı'],
  ['nars?rab', 'narşərab'],
  ['?zm?', 'əzmə'],
  ['kesnis', 'keşniş'],
  ['ag ', 'ağ '],
  [' Ag ', ' Ağ '],
  [' il?', ' ilə'],
  ['d?n?si', 'dənəsi'],
  ['kah?', 'kahı'],
  ['cerri', 'çerri'],
  ['puresi', 'püresi'],
  ['zogal', 'zoğal'],
  ['tursusu', 'turşusu'],
  ['tursu', 'turşu'],
  ['yas?l', 'yaşıl'],
  ['Dusb?r?', 'Düşbərə'],
  ['sar?kok', 'sarıkök'],
  ['Naggetsl?ri', 'Naggetsləri'],
  ['?d?d', 'ədəd'],
  ['p?rd?si', 'pərdəsi'],
  ['ciy?ri', 'ciyəri'],
  ['Ciy?r', 'Ciyər'],
  ['ciy?r', 'ciyər'],
  ['quyrugu', 'quyruğu'],
  ['Ağ ?t', 'Ağ ət'],
  ['Lul?', 'Lülə'],
  ['Basd?rma', 'Basdırma'],
  ['k?klikotu', 'kəklikotu'],
  ['Bec?', 'Beçə'],
  ['usulu', 'üsulu'],
  ['Dolmas?', 'Dolması'],
  ['uzum yarpag?', 'üzüm yarpağı'],
  ['goy?rti', 'göyərti'],
  ['k?r?', 'kərə'],
  ['gob?l?k', 'göbələk'],
  ['Qar?s?q', 'Qarışıq'],
  ['qar?s?q', 'qarışıq'],
  ['Qiym?li', 'Qiyməli'],
  ['Qusbas?', 'Quşbaşı'],
  ['Qovurmal?', 'Qovurmalı'],
  ['sudlu', 'südlü'],
  ['Isk?nd?r', 'İskəndər'],
  ['isk?nd?r', 'iskəndər'],
  ['cor?yi', 'çörəyi'],
  ['qat?q', 'qatıq'],
  ['Ustu', 'Üstü'],
  ['Sutlac', 'Sütlaç'],
  ['Sud', 'Süd'],
  ['s?k?r', 'şəkər'],
  ['Sayag?', 'Sayağı'],
  ['Kopuklu', 'Köpüklü'],
  ['T?rxun', 'Tərxun'],
  ['Qazl?', 'Qazlı'],
  ['Qazs?z', 'Qazsız'],
  ['fres', 'freş'],
  ['F?st?k', 'FISTIK'],
  [' Əti', ' əti'],
  [' Ət ', ' ət '],
  ['Ət Dönəri', 'Ət dönəri'],
  ['Toyuq Donəri', 'Toyuq dönəri'],
  ['Porsiyon Dönər', 'Porsiyon dönər'],
  ['Plov Üstü Dönər', 'Plov üstü dönər'],
  ['İskəndər Dönər', 'İskəndər dönər'],
  ['Qatəq', 'Qatıq'],
  ['Qarəşıq', 'Qarışıq'],
  ['yarəm', 'yarım'],
  ['1əd', '1 ədəd'],
  ['ketcup', 'ketçup'],
  ['mayonez,ketçup', 'mayonez, ketçup'],
  ['fri,pepsi', 'fri, pepsi'],
  ['dönər (lavaş)', 'dönər (lavaşda)'],
  ['dönər (çörək)', 'dönər (çörəkdə)'],
  ['Ciy', 'Çiy'],
  ['Coban', 'Çoban'],
  ['cili', 'çili'],
  ['sirin', 'şirin'],
  ['nisastas?', 'nişastası'],
  ['qovrulmus', 'qovrulmuş'],
  ['kuncut', 'küncüt'],
  ['guleruz', 'gülərüz'],
  ['mohtesemdir', 'möhtəşəmdir'],
  ['gozel', 'gözəl'],
  ['mekandir', 'məkandır'],
  ['yuksek', 'yüksək'],
  ['seviyededir', 'səviyyədədir'],
  ['evvel', 'əvvəl']
];

const cleanText = (value = '') => {
  let text = value.replaceAll('�', '');
  TEXT_FIXES.forEach(([from, to]) => {
    text = text.replaceAll(from, to);
  });
  return text
    .replaceAll('?', 'ə')
    .replaceAll('Festeek', 'FISTIK')
    .replaceAll('Fistik Restorane', 'FISTIK restoranı')
    .replace(/\s+/g, ' ')
    .trim();
};

const getPrice = (price: string) => {
  const normalized = price.replaceAll(',', '.').replaceAll('?', '').trim();
  return normalized.toUpperCase().includes('AZN') ? normalized : `${normalized} ₼`;
};

const MENU_ITEMS = {
  popular: [
    { name: 'Sad? Lahmacun', desc: 'Quzu ?ti, r?ngli bib?r, kimyon, qarg?dal? yag?, un, limon', price: '6.90', img: 'https://imageproxy.wolt.com/assets/66f29d8cfea5e3547f0efbd7?w=960' },
    { name: 'Toyuq Filesi Kabab?', desc: 'Toyuq filesi, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40', img: 'https://imageproxy.wolt.com/assets/66f2a034fea5e3547f0efc3d?w=960' },
    { name: '?t Don?ri Cor?kd? (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, t?z? xiyar, cor?k', price: '6.90' },
    { name: '?t Don?ri Lavasda (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, t?z? xiyar, lavas', price: '6.90' },
    { name: 'M?rci Sorbas?', desc: 'M?rci, sogan, kok, qarg?dal? yag?, istiot', price: '6.30' },
    { name: 'Toyuq Cop Sis Kabab?', desc: 'Toyuq filesi, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' },
    { name: 'Quzu Tik? Kabab', desc: 'Quzu ?ti, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90' },
    { name: 'Quzu Cop Sis Kabab', desc: 'Quzu budu, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90' },
    { name: 'Ac?l? Lahmacun', desc: 'Quzu ?ti, r?ngli bib?r, kimyon, pul bib?r, qarg?dal? yag?, un, limon', price: '6.90' },
    { name: 'X?rc?lt?l? Bad?mcan Salat?', desc: 'Bad?mcan, qazax pomidoru, mamasita sousu, sirin cili sousu, qarg?dal? nisastas?, qovrulmus kuncut, yas?l sogan', price: '11.20' },
    { name: 'Quzu Antrekotu', desc: 'Quzu ag ?t, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '18.70', img: 'https://imageproxy.wolt.com/assets/66f29ebbc02c6c7da59ce996?w=960' },
    { name: 'Kartof Fri', desc: 'Kartof fri, ketcup, mayonez, duz', price: '6.90' }
  ],

  lanc: [
    { name: 'Lanc 1', desc: 'M?rci sorbas? (yar?m pors), toyuq don?r, ayran 250 ml', price: '12,60 ?' },
    { name: 'Lanc 2', desc: 'M?rci sorbas? (yar?m pors), ?t don?r, ayran 250 ml', price: '12,60 ?' },
    { name: 'Lanc 3', desc: 'M?rci sorbas? (yar?m pors), lahmacun 1?d, ayran 250 ml', price: '12,60 ?' }
  ],

  salatlar: [
    { name: 'Mimoza Salat?', desc: 'Kok, kartof, qauda pendiri, yumurta, mayonez', price: '8.20' },
    { name: 'Ciy Koft?', desc: 'Bulqur, isot bib?ri, bib?r salcas?, nan? qurusu, nars?rab', price: '8.70' },
    { name: 'Haydari', desc: 'Suzm?, suyud, zeytun yag?, nan? qurusu', price: '6.90' },
    { name: 'Manqal Salat?', desc: 'Bad?mcan, r?ngli bib?r, pomidor, reyhan, q?rm?z? sogan', price: '9.40' },
    { name: 'Gavurdag? Salat?', desc: 'Pomidor, xiyar, q?rm?z? sogan, qoz, nars?rab, zeytun yag?', price: '9.90' },
    { name: 'Ac?l? ?zm?', desc: 'Xiyar, pomidor, ac? bib?r, r?ngli bib?r, sogan, sumaq, nan?', price: '8.20' },
    { name: 'Coban Salat?', desc: 'Pomidor, xiyar, limon suyu, zeytun yag?, kesnis, suyud, ag pendir', price: '9.40' },
    { name: 'Sezar Salat? Toyuq il?', desc: 'Toyuq filesi, aysberq salat?, pomidor, sezar sousu, parmezan pendiri', price: '17.40' },
    { name: 'Popkorn Salat?', desc: 'Toyuq filesi, suxari panko, yumurta, un, kimyon, qarg?dal? d?n?si, sirin cili, aysberq salat?, kah?, cerri pomidoru, manqo puresi', price: '16.20' },
    { name: 'Pomidor Salat?', desc: 'Pomidor, ac? bib?r, q?rm?z? sogan, zirinc, reyhan, zogal tursusu, duz', price: '9.90' },
    { name: 'X?rc?lt?l? Bad?mcan Salat?', desc: 'Bad?mcan, qazax pomidoru, mamasita sousu, sirin cili sousu, qarg?dal? nisastas?, qovrulmus kuncut, yas?l sogan', price: '11.20' },
    { name: 'Paytaxt Salat?', desc: 'Kok, yas?l noxud, suyud, yumurta, kartof, mayonez', price: '8.20' }
  ],

  shorbalar: [
    { name: 'M?rci Sorbas?', desc: 'M?rci, sogan, kok, qarg?dal? yag?, istiot', price: '6.30' },
    { name: 'Toyuq Sorbas?', desc: 'Toyuq filesi, kok, r?ngli bib?r, sogan, k?r? yag?', price: '8.70' },
    { name: 'Yayla Sorbas?', desc: 'Qat?q, qaymaq, yumru duyu, nan? qurusu, k?r? yag?', price: '6.30' },
    { name: 'Dusb?r?', desc: 'Quzu ?ti, nan? qurusu, sar?kok', price: '9.90' }
  ],

  qarni: [
    { name: 'Kartof Fri', desc: 'Kartof fri, ketcup, mayonez, duz', price: '6.90' },
    { name: 'Toyuq Naggetsl?ri (6 ?d?d)', desc: 'Toyuq filesi, suxari panko, yumurta, un, kimyon, sirin cili sousu, duz', price: '9.40' },
    { name: 'Duyu', desc: '', price: '4.90' },
    { name: 'Qarabasaq', desc: '', price: '4.90' }
  ],

  quzu: [
    { name: 'Quzu Antrekotu', desc: 'Quzu ag ?t, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '18.70', img: 'https://imageproxy.wolt.com/assets/66f29ebbc02c6c7da59ce996?w=960' },
    { name: 'Quzu Beli Kabab?', desc: 'Quzu beli, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '18.70' },
    { name: 'Quzu Cop Sis Kabab', desc: 'Quzu budu, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90', img: 'https://imageproxy.wolt.com/assets/66f29f07fea5e3547f0efc13?w=960' },
    { name: 'Quzu Tik? Kabab', desc: 'Quzu ?ti, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90' },
    { name: 'Quzu Sarma Beyti', desc: 'Quzu ?ti, quyruq, lavas, r?ngli bib?r, sar?msaq, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '19.40' },
    { name: 'Quzu Xan Kabab?', desc: 'Quzu ciy?ri, quzu ic p?rd?si, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '14.90' },
    { name: 'Kasap Koft?', desc: 'Quzu ?ti, dana ?ti, sumaq, sogan, duz, istiot, c?f?ri', price: '18.20' },
    { name: 'Quzu Ciy?r Kabab? Quyruq il?', desc: 'Quzu ciy?ri, quzu quyrugu, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '14.90' },
    { name: 'Quzu Adana Kabab?', desc: 'Quzu ?ti, quyruq, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90' },
    { name: 'Quzu Ag ?t Kabab?', desc: 'Quzu ag ?t, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '14.90' },
    { name: 'Quzu Lul? Kabab', desc: 'Quzu ?ti, quyruq, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.70' },
    { name: 'Quzu Langet', desc: 'Quzu budu, sumaq, sogan, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '16.90' },
    { name: 'Quzu Basd?rma Kabab', desc: 'Quzu budu, sumaq, sogan, duz, istiot, c?f?ri, k?klikotu, qarg?dal? yag?, kull?m? kartof, pomidor, duyu, lavas', price: '18.70' }
  ],

  dana: [
    { name: 'Dana Bel Basd?rma Kabab', desc: 'Dana bel ?ti, k?klikotu, limon, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '18.70' },
    { name: 'Dana Lokum Izqara Kabab', desc: 'Dana can ?ti, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, kull?m? kartof, pomidor, duyu, lavas', price: '30.00' }
  ],

  toyuq: [
    { name: 'Toyuq Filesi Kabab?', desc: 'Toyuq filesi, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40', img: 'https://imageproxy.wolt.com/assets/66f2a034fea5e3547f0efc3d?w=960' },
    { name: 'Toyuq Qanad? Kabab?', desc: 'Toyuq qanad?, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' },
    { name: 'Toyuq Cop Sis Kabab?', desc: 'Toyuq filesi, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' },
    { name: 'Toyuq Qar?s?q Kabab', desc: 'Toyuq broyler, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' },
    { name: 'Toyuq Bud Dibi Kabab?', desc: 'Toyuq bud dibi, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' },
    { name: 'Bec? Tabaka', desc: 'Bec?, kah?, yag, ev usulu kartof, duz, istiot', price: '22.40' },
    { name: 'Toyuq Bud Kabab?', desc: 'Toyuq budu, sogan, qarg?dal? yag?, duz, istiot, c?f?ri, tomat pastas?, kull?m? kartof, pomidor, duyu, lavas', price: '12.40' }
  ],

  isti: [
    { name: 'Yarpaq Dolmas?', desc: 'Quzu ?ti, quzu quyrugu, yumru duyu, uzum yarpag?, dana ?ti, goy?rti', price: '18.70' },
    { name: 'Kiyev Kotleti', desc: 'Toyuq filesi, k?r? yag?, panko suxari, yumurta, pomidor, mayonez, kartof fri', price: '14.90' },
    { name: 'Toyuq Snitsel', desc: 'Toyuq filesi, suxari panko, yumurta, duz, istiot, kartof fri, pomidor, ac? bib?r, ketcup', price: '16.90' },
    { name: 'Toyuq Sote', desc: 'Toyuq filesi, r?ngli bib?r, sogan, bib?r pastas?, duyu', price: '12.40' },
    { name: '?t Sote', desc: 'Dana ?ti, r?ngli bib?r, yas?l bib?r, sogan, bib?r salcas?, duyu', price: '14.90' },
    { name: 'Fettucini Alfredo', desc: 'Fettucini, toyuq filesi, qaymaq, gob?l?k, parmezan pendiri, k?r? yag?, duz, istiot', price: '21.20' }
  ],

  pizzalar: [
    { name: 'Pizza Kolbasa il?', desc: 'Servelat kolbasa, un, maya, duz, zeytun yag?, mozzarella pendiri', price: '18.70' },
    { name: 'Qar?s?q Pizza', desc: 'Sosis, gob?l?k, kolbasa, ac? bib?r, un, maya, duz, pomidor, zeytun yag?, mozzarella pendiri', price: '19.40' },
    { name: 'Pizza Marqarita', desc: 'Un, maya, duz, pomidor, zeytun yag?, mozzarella pendiri', price: '13.80' },
    { name: 'Sucuklu Pizza', desc: 'Sucuk, un, maya, duz, zeytun yag?, mozzarella pendiri', price: '16.90' },
    { name: 'Toyuqlu Pizza', desc: 'Un, maya, duz, toyuq filesi, yas?l bib?r, pomidor, zeytun yag?, mozzarella pendiri', price: '16.20' },
    { name: 'Sosisli Pizza', desc: 'Sosis, un, maya, duz, zeytun yag?, mozzarella pendiri', price: '16.90' },
    { name: 'Vegetarian Pizza', desc: 'Un, maya, duz, pomidor, zeytun yag?, mozzarella pendiri, yas?l bib?r, gob?l?k, qarg?dal? d?n?l?ri, qara tumsuz zeytun', price: '16.20' }
  ],

  burger: [
    { name: 'F?st?k Burger', desc: 'Dana ?ti, sumaq, tursu xiyar, pomidor, kah?, mayonez, ketcup, kartof fri', price: '17.40' }
  ],

  pide: [
    { name: 'Qar?s?q Pide', desc: 'Can ?ti, pomidor, ac? bib?r, un, qarg?dal? yag?, mozzarella pendiri', price: '18.70' },
    { name: 'Qiym?li Pide', desc: 'Dana ?ti, pomidor, ac? bib?r, un, qarg?dal? yag?', price: '14.90' },
    { name: 'Qusbas? Pide', desc: 'Can ?ti, pomidor, ac? bib?r, un, qarg?dal? yag?, mozzarella pendiri', price: '18.70' },
    { name: 'Pendirli Pide', desc: 'Mozzarella pendiri, un, qarg?dal? yag?', price: '13.70' },
    { name: 'Sosisli Pide', desc: 'Mozzarella pendiri, un, qarg?dal? yag?, sudlu sosis', price: '16.20' },
    { name: 'Qiym?li v? Pendirli Pide', desc: 'Dana ?ti, pomidor, ac? bib?r, un, qarg?dal? yag?, mozzarella pendiri', price: '16.20' },
    { name: 'Qovurmal? Pide', desc: 'Qovurma mal ?ti, pomidor, ac? bib?r, un, qarg?dal? yag?, mozzarella pendiri', price: '19.90' },
    { name: 'Sucuklu Pide', desc: 'Sucuk, un, qarg?dal? yag?, mozzarella pendiri', price: '16.20' }
  ],

  lahmacun: [
    { name: 'Sad? Lahmacun', desc: 'Quzu ?ti, r?ngli bib?r, kimyon, qarg?dal? yag?, un, limon', price: '6.90', img: 'https://imageproxy.wolt.com/assets/66f29d8cfea5e3547f0efbd7?w=960' },
    { name: 'Ac?l? Lahmacun', desc: 'Quzu ?ti, r?ngli bib?r, kimyon, pul bib?r, qarg?dal? yag?, un, limon', price: '6.90' },
    { name: 'Pendirli Lahmacun', desc: 'Quzu ?ti, r?ngli bib?r, kimyon, qarg?dal? yag?, un, limon, mozzarella pendiri', price: '8.70' }
  ],

  doner: [
    { name: 'Tombik Don?r Toyuq il? (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, kah?, cedar pendiri, t?z? xiyar, tombik cor?k', price: '7.40' },
    { name: 'Tombik Don?r ?t il? (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, kah?, cedar pendiri, xiyar tursusu, tombik cor?k', price: '9.40' },
    { name: '?t Don?ri Lavasda (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, t?z? xiyar, lavas', price: '6.90' },
    { name: 'Porsiyon Don?r ?t il? (150 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '18.70' },
    { name: 'Porsiyon Don?r Toyuq il? (150 qr)', desc: 'Toyuq ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '12.40' },
    { name: 'Toyuq Don?ri Lavasda (70 qr)', desc: 'Toyuq ?ti, don?r sousu, pomidor, t?z? xiyar, lavas', price: '5.70' },
    { name: 'Toyuq Don?ri Cor?kd? (70 qr)', desc: 'Toyuq ?ti, don?r sousu, pomidor, t?z? xiyar, cor?k', price: '5.70' },
    { name: 'Isk?nd?r Don?r ?t il? (150 qr)', desc: 'Dana ?ti, quzu ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '21.20' },
    { name: '?t Don?ri Cor?kd? (70 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, t?z? xiyar, cor?k', price: '6.90' },
    { name: 'Isk?nd?r Don?r Toyuq il? (150 qr)', desc: 'Toyuq ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '13.20' },
    { name: 'Isk?nd?r Don?r Toyuq il? (180 qr)', desc: 'Toyuq ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '15.70' },
    { name: 'Isk?nd?r Don?r Toyuq il? (240 qr)', desc: 'Toyuq ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '18.20' },
    { name: 'Porsiyon Don?r Toyuq il? (180 qr)', desc: 'Toyuq ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '13.70' },
    { name: 'Porsiyon Don?r Toyuq il? (240 qr)', desc: 'Toyuq ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '16.20' },
    { name: 'Plov Ustu Don?r Toyuq il? (150 qr)', desc: 'Toyuq ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '13.70' },
    { name: 'Plov Ustu Don?r Toyuq il? (180 qr)', desc: 'Toyuq ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '14.90' },
    { name: 'Plov Ustu Don?r Toyuq il? (240 qr)', desc: 'Toyuq ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '17.40' },
    { name: 'Isk?nd?r Don?r ?t il? (180 qr)', desc: 'Dana ?ti, quzu ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '23.70' },
    { name: 'Isk?nd?r Don?r ?t il? (240 qr)', desc: 'Dana ?ti, quzu ?ti, isk?nd?r sousu, pomidor, ac? bib?r, isk?nd?r cor?yi, k?r? yag?, qat?q', price: '27.40' },
    { name: 'Porsiyon Don?r ?t il? (180 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '21.20' },
    { name: 'Porsiyon Don?r ?t il? (240 qr)', desc: 'Dana ?ti, quzu ?ti, don?r sousu, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas', price: '26.20' },
    { name: 'Plov Ustu Don?r ?t il? (150 qr)', desc: 'Dana ?ti, quzu ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '19.90' },
    { name: 'Plov Ustu Don?r ?t il? (180 qr)', desc: 'Dana ?ti, quzu ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '22.40' },
    { name: 'Plov Ustu Don?r ?t il? (240 qr)', desc: 'Dana ?ti, quzu ?ti, pomidor, ac? bib?r, tursu xiyar, kartof fri, lavas, duyu', price: '27.40' }
  ],

  desert: [
    { name: 'Sutlac', desc: 'Sud, un, s?k?r tozu, yumurta, yumru duyu, nisasta, vanil', price: '6.30' }
  ],

  icecek: [
    { name: 'Ev Sayag? Kopuklu Ayran 250 ml', desc: 'Qat?q, su, duz', price: '3.20' },
    { name: 'Pepsi� 330 ml', desc: '', price: '5.70' },
    { name: 'Seven Up� 330 ml', desc: '', price: '5.70' },
    { name: 'Mirinda� 330 ml', desc: '', price: '5.70' },
    { name: 'Natakhtari� Duses 500 ml', desc: '', price: '5.70' },
    { name: 'Natakhtari� T?rxun 500ml', desc: '', price: '5.70' },
    { name: 'Sirab� Qazl? Su 500 ml', desc: '', price: '4.40' },
    { name: 'Sirab� Qazs?z Su 500 ml', desc: '', price: '4.40' }
  ],

  elave: [
    { name: 'Cor?k', desc: '', price: '1.30' },
    { name: 'Puf cor?k', desc: '', price: '3.20' }
  ],

  fresh: [
    { name: 'Qar?s?q fres', desc: '', price: '10.00' },
    { name: 'Alma fresi', desc: '', price: '8.75' },
    { name: 'Nar fresi', desc: '', price: '8.75' },
    { name: 'Qreyfrut fresi', desc: '', price: '11.25' },
    { name: 'Ananas fresi', desc: '', price: '13.75' },
    { name: 'Limon fresi', desc: '', price: '7.50' },
    { name: 'Portagal fresi', desc: '', price: '10.00' }
  ],

  special: [
    { name: 'F?st?k burger combo', desc: 'Burger ?t il?, kartof fri, pepsi 0.5ml, mayonez, ketcup', price: '21.20' },
    { name: 'Toyuq burger combo', desc: 'Burger toyuq il?, kartof fri,pepsi 0.5ml,mayonez, ketcup', price: '18.70' },
    { name: 'Toyuq don?r (lavas) combo', desc: 'Lavasda toyuq don?r, kartof fri, pepsi 0.5ml, mayonez, ketcup', price: '15.70' },
    { name: '?t don?r (lavas) combo', desc: 'Lavasda ?t don?r, kartof fri, pepsi 0.5ml, mayonez,ketcup', price: '16.90' },
    { name: 'Toyuq don?r (cor?k) combo', desc: 'Cor?kd? toyuq don?r, kartof fri, pepsi 0.5ml, mayonez,ketcup', price: '15.70' },
    { name: '?t don?r (cor?k) combo', desc: 'Cor?kd? ?t don?r, kartof fri, pepsi 0.5ml, mayonez,ketcup', price: '16.90' }
  ]
};

const REVIEWS = [
  { name: 'Sabir', rating: 5, date: '1 il əvvəl', text: 'Çox dadlı yeməklər, ətirli çay, gülərüz personal və münasib qiymət. Uşaqlar üçün oyun otağı və namaz otağı mövcuddur.' },
  { name: 'Zarina Samirova', rating: 5, date: '9 ay əvvəl', text: 'Restoran möhtəşəmdir, yeməklər dadlı və keyfiyyətlidir. İş yerimizə yaxın olduğu üçün dostlarla tez-tez seçirik.' },
  { name: 'Emina Kerimova', rating: 5, date: '3 ay əvvəl', text: 'Çox gözəl məkandır. Xidmət yüksək səviyyədədir, ailəvi gəlmək üçün idealdır.' },
  { name: 'Ümid Soltanlı', rating: 5, date: '9 ay əvvəl', text: 'Keyfiyyət əla, personal əla. İnsan öz evində yemək yeyirmiş kimi hiss edir.' }
];

const GALLERY = [
  { src: galleryHallImg, title: 'FISTIK zal atmosferi', tone: 'İnteryer' },
  { src: galleryTablesImg, title: 'Ailəvi masa düzümü', tone: 'Məkan' },
  { src: galleryKitchenImg, title: 'Açıq mətbəx görüntüsü', tone: 'Mətbəx' },
  { src: galleryLightsImg, title: 'İşıq və dekor detalları', tone: 'Detal' }
];

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  img?: string;
};

type GalleryItem = {
  src: string;
  title: string;
  tone: string;
};

const menuItems = MENU_ITEMS as Record<string, MenuItem[]>;

Object.keys(menuItems).forEach((catKey) => {
  const items = menuItems[catKey];
  items.forEach((item, idx) => {
    if (!item.img) {
      const galleryIdx = idx % GALLERY.length;
      item.img = CATEGORY_IMAGES[catKey] ?? GALLERY[galleryIdx]?.src ?? heroImg;
    }
  });
});

const NAV_LINKS = [
  { label: 'Haqqımızda', href: '#haqqimizda' },
  { label: 'Menyu', href: '#menyu' },
  { label: 'Qalereya', href: '#qalereya' },
  { label: 'Əlaqə', href: '#elaqe' }
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function LogoMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#8db600] text-white shadow-lg shadow-black/10">
        <span className="font-serif text-2xl font-black leading-none">F</span>
      </div>
      <div className="leading-none">
        <div className={`font-serif text-2xl font-black tracking-normal ${light ? 'text-white' : 'text-[#452018] dark:text-white'}`}>FISTIK</div>
        <div className={`mt-1 text-[10px] font-bold uppercase tracking-[0.22em] ${light ? 'text-white/60' : 'text-[#452018]/55 dark:text-white/55'}`}>Restoran</div>
      </div>
    </div>
  );
}

function SmartImage({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className: string }) {
  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const image = event.currentTarget;
        if (image.dataset.fallbackApplied === 'true') return;
        image.dataset.fallbackApplied = 'true';
        image.src = fallback;
      }}
    />
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('fistik-theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 34);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('fistik-theme', theme);
  }, [theme]);

  const activeCategoryName = MENU_CATEGORIES.find((cat) => cat.id === activeCategory)?.name ?? 'Menyu';
  const activeItems = menuItems[activeCategory] ?? [];
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = activeItems.filter((item) => {
    if (!normalizedQuery) return true;
    return `${cleanText(item.name)} ${cleanText(item.desc)}`.toLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="min-h-screen bg-[#fffaf1] text-[#241714] selection:bg-[#d2a246]/30 dark:bg-[#10120f] dark:text-[#f7efe3]">
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#fffaf1]/90 py-3 shadow-sm backdrop-blur-xl dark:bg-[#10120f]/88 dark:shadow-black/20' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#" aria-label="Fistik ana sehife">
            <LogoMark light={!scrolled} />
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-semibold text-[#452018]/75 transition hover:bg-[#452018] hover:text-white dark:text-white/75 dark:hover:bg-white dark:hover:text-[#10120f]">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/80 text-[#452018] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#d2a246] hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label="Tema deyis"
              title={theme === 'dark' ? 'Aydın mod' : 'Qaranlıq mod'}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/80 text-[#452018] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menyunu aç"
            >
              <MenuIcon size={21} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#10120f]/80 p-4 backdrop-blur-md md:hidden">
            <motion.div initial={{ y: -18 }} animate={{ y: 0 }} exit={{ y: -18 }} className="rounded-[2rem] bg-[#fffaf1] p-5 shadow-2xl dark:bg-[#171a15]">
              <div className="mb-8 flex items-center justify-between">
                <LogoMark />
                <button type="button" onClick={() => setIsMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-black/5 text-[#452018] dark:bg-white/10 dark:text-white" aria-label="Menyunu bağla">
                  <X size={20} />
                </button>
              </div>
              <div className="grid gap-2">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="rounded-2xl px-4 py-4 text-lg font-bold text-[#452018] transition hover:bg-[#8db600]/15 dark:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-0">
          <motion.img src={heroImg} alt="Fistik restoran interyeri" className="h-full w-full object-cover" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: 'easeOut' }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,18,15,.88),rgba(16,18,15,.56),rgba(16,18,15,.18))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf1] to-transparent dark:from-[#10120f]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-8 px-5 pb-14 md:px-8 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="max-w-3xl text-white">
            <motion.div variants={sectionReveal} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Star size={16} fill="currentColor" className="text-[#d2a246]" />
              4.8 reytinq · Nərimanov, Bakı
            </motion.div>
            <motion.h1 variants={sectionReveal} className="font-serif text-5xl font-black leading-[0.9] tracking-normal md:text-7xl lg:text-8xl">
              FISTIK
              <span className="mt-4 block font-sans text-base font-bold uppercase tracking-[0.28em] text-[#d2a246] md:text-xl">Restoran</span>
            </motion.h1>
            <motion.p variants={sectionReveal} className="mt-5 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
              Milli mətbəx, manqal ləzzəti və ailəvi restoran atmosferi bir arada. Menyu indi daha rahat oxunur, şəkillər isə hər bölməyə uyğun göstərilir.
            </motion.p>
            <motion.div variants={sectionReveal} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#menyu" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d2a246] px-7 py-4 font-bold text-[#241714] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-white">
                Menyuya bax <ChevronRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a href={WOLT_MENU_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#241714]">
                Wolt-da sifariş <ExternalLink size={17} />
              </a>
              <a href="#elaqe" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-[#8db600] hover:bg-[#8db600]">
                Əlaqə <Phone size={17} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="hidden lg:block">
            <div className="rounded-[2rem] border border-white/18 bg-white/12 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-4">
                {[kebabImg, breakfastImg, dessertImg].map((image, index) => (
                  <div key={image} className={`overflow-hidden rounded-3xl ${index === 0 ? 'col-span-2 aspect-[2.1/1]' : 'aspect-square'}`}>
                    <SmartImage src={image} fallback={heroImg} alt="FISTIK menyu görüntüsü" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="haqqimizda" className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/10">
            <SmartImage src={ownerInterior} fallback={heroImg} alt="Fistik restoran zali" className="aspect-[4/3] h-full w-full object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <span className="text-sm font-black uppercase tracking-[0.28em] text-[#8db600]">Bizi tanıyın</span>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-tight text-[#452018] dark:text-white md:text-6xl">Ləzzətli süfrələr üçün sakit və səliqəli məkan</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f5149] dark:text-white/68">
              FISTIK restoranı milli mətbəxin tanış dadlarını rahat interyer, operativ servis və geniş menyu ilə birləşdirir. Saytda əsas diqqət menyuya, real atmosfer görüntülərinə və tez əlaqə imkanlarına verilib.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['08:00 - 23:00', 'Hər gün açıq'],
                ['19 bölmə', 'Geniş menyu'],
                ['Wolt', 'Çatdırılma']
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-black/8 bg-white/70 p-5 dark:border-white/10 dark:bg-white/7">
                  <div className="font-serif text-2xl font-black text-[#452018] dark:text-white">{value}</div>
                  <div className="mt-1 text-sm font-semibold text-[#5f5149] dark:text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="menyu" className="bg-[#171a15] px-5 py-20 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.28em] text-[#d2a246]">Menyu sistemi</span>
              <h2 className="mt-4 font-serif text-4xl font-black md:text-6xl">Yeməkləri rahat seçin</h2>
            </div>
            <label className="relative block w-full max-w-md">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/45" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Yemək adı axtar..."
                className="h-13 w-full rounded-full border border-white/12 bg-white/8 pl-12 pr-5 text-sm font-semibold outline-none transition placeholder:text-white/38 focus:border-[#d2a246] focus:bg-white/12"
              />
            </label>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="max-h-[70vh] overflow-auto rounded-[1.5rem] border border-white/10 bg-white/7 p-2 backdrop-blur">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`mb-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${activeCategory === cat.id ? 'bg-[#d2a246] text-[#241714]' : 'text-white/68 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-black/10 px-2 py-1 text-xs">{menuItems[cat.id]?.length ?? 0}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div>
              <div className="mb-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/7">
                <div className="grid md:grid-cols-[220px_1fr]">
                  <SmartImage src={CATEGORY_IMAGES[activeCategory]} fallback={kebabImg} alt={activeCategoryName} className="h-52 w-full object-cover md:h-full" />
                  <div className="p-6 md:p-8">
                    <div className="text-sm font-black uppercase tracking-[0.22em] text-[#d2a246]">{filteredItems.length} seçim</div>
                    <h3 className="mt-2 font-serif text-3xl font-black md:text-5xl">{activeCategoryName}</h3>
                    <p className="mt-3 max-w-2xl text-white/62">Bu bölmədə yemək adına uyğun şəkillər göstərilir. Şəkil yüklənməsə, avtomatik olaraq bölmənin stabil görüntüsü istifadə olunur.</p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={`${activeCategory}-${searchQuery}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item, idx) => (
                    <motion.article key={`${item.name}-${idx}`} layout className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#fffaf1] text-[#241714] shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-2xl dark:bg-[#20251e] dark:text-white">
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                        <SmartImage src={item.img ?? CATEGORY_IMAGES[activeCategory]} fallback={CATEGORY_IMAGES[activeCategory]} alt={cleanText(item.name)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#452018] shadow-sm">{activeCategoryName}</div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-lg font-black leading-snug text-[#452018] dark:text-white">{cleanText(item.name)}</h4>
                          <span className="shrink-0 rounded-full bg-[#8db600]/15 px-3 py-1 text-sm font-black text-[#5d7600] dark:text-[#c8ec62]">{getPrice(item.price)}</span>
                        </div>
                        {cleanText(item.desc) && <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f5149] dark:text-white/60">{cleanText(item.desc)}</p>}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/7 p-10 text-center text-white/65">Axtarışa uyğun yemək tapılmadı.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.28em] text-[#8db600]">Üstünlüklər</span>
              <h2 className="mt-4 font-serif text-4xl font-black text-[#452018] dark:text-white md:text-6xl">Restoran rahatlığı</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESTAURANT_FEATURES.map((feature, idx) => (
              <motion.div key={feature.group} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }} className="rounded-[1.5rem] border border-black/8 bg-white/72 p-6 shadow-sm dark:border-white/10 dark:bg-white/7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#8db600]/14 text-[#5d7600] dark:text-[#c8ec62]"><feature.icon size={24} /></div>
                <h3 className="text-xl font-black text-[#452018] dark:text-white">{feature.group}</h3>
                <ul className="mt-4 grid gap-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-[#5f5149] dark:text-white/62">
                      <CheckCircle2 size={17} className="text-[#8db600]" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="qalereya" className="bg-[#f0eadf] px-5 py-20 dark:bg-[#171a15] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.28em] text-[#8db600]">Qalereya</span>
              <h2 className="mt-4 font-serif text-4xl font-black text-[#452018] dark:text-white md:text-6xl">Kafenin atmosferi</h2>
            </div>
            <p className="max-w-md text-[#5f5149] dark:text-white/62">Bu bölmədə yalnız məkana aid görüntülər saxlanılıb. Yemək şəkilləri menyu kartlarında ayrıca göstərilir.</p>
          </div>

          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[240px]">
            {GALLERY.map((item, idx) => (
              <button key={item.title} type="button" onClick={() => setSelectedGallery(item)} className={`group relative overflow-hidden rounded-[1.5rem] text-left shadow-lg shadow-black/10 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <SmartImage src={item.src} fallback={heroImg} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-[#d2a246]">{item.tone}</span>
                  <div className="mt-1 flex items-center justify-between gap-3 text-lg font-black">
                    {item.title}
                    <ArrowUpRight size={20} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedGallery && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/82 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGallery(null)}>
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-[#10120f] shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => setSelectedGallery(null)} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur" aria-label="Sekli bagla">
                <X size={20} />
              </button>
              <SmartImage src={selectedGallery.src} fallback={heroImg} alt={selectedGallery.title} className="max-h-[78vh] w-full object-contain" />
              <div className="border-t border-white/10 p-5 text-white">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-[#d2a246]">{selectedGallery.tone}</div>
                <div className="mt-1 text-xl font-black">{selectedGallery.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.28em] text-[#8db600]">Reyler</span>
              <h2 className="mt-4 font-serif text-4xl font-black text-[#452018] dark:text-white md:text-6xl">Qonaqlar nə deyir?</h2>
            </div>
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-black/8 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/7">
              <div className="flex text-[#d2a246]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={17} fill="currentColor" />)}</div>
              <strong>4.8</strong>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((review) => (
              <article key={review.name} className="rounded-[1.5rem] border border-black/8 bg-white/72 p-6 shadow-sm dark:border-white/10 dark:bg-white/7">
                <div className="mb-4 flex text-[#d2a246]">{[...Array(review.rating)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                <p className="text-sm leading-6 text-[#5f5149] dark:text-white/62">"{review.text}"</p>
                <div className="mt-5 font-black text-[#452018] dark:text-white">{review.name}</div>
                <div className="mt-1 text-xs font-semibold text-[#5f5149]/60 dark:text-white/40">{review.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="elaqe" className="bg-[#452018] px-5 py-20 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="text-sm font-black uppercase tracking-[0.28em] text-[#d2a246]">Əlaqə</span>
            <h2 className="mt-4 font-serif text-4xl font-black md:text-6xl">Bizi asan tapın</h2>
            <div className="mt-9 grid gap-5">
              {[
                [MapPin, 'Ünvan', 'Nərimanov rayonu, Qarabağ küçəsi 48C, Bakı'],
                [Phone, 'Telefon', '070 888 55 77 / 012 496 22 04'],
                [Clock, 'İş saatları', 'Hər gün: 08:00 - 23:00']
              ].map(([Icon, title, value]) => (
                <div key={String(title)} className="flex gap-4 rounded-[1.25rem] bg-white/8 p-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#d2a246]"><Icon size={23} /></div>
                  <div>
                    <div className="font-black">{String(title)}</div>
                    <div className="mt-1 text-white/65">{String(value)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex gap-3">
              <a href="https://www.instagram.com/fistik.restaurant/" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition hover:bg-[#d2a246] hover:text-[#241714]" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/p/F%C4%B1st%C4%B1k-Restaurant-61556087931614/" target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition hover:bg-[#d2a246] hover:text-[#241714]" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>
          <div className="min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/10 p-2 shadow-2xl shadow-black/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.858485292671!2d49.8559226!3d40.3898291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d816d43747d%3A0xc825d0ffea1d928d!2sFistik!5e0!3m2!1sen!2saz!4v1747295483123!5m2!1sen!2saz"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FISTIK restoran ünvanı"
              className="rounded-[1.35rem]"
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#10120f] px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <LogoMark light />
          <div className="flex flex-wrap gap-4">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href} className="text-sm font-bold text-white/58 transition hover:text-[#d2a246]">{link.label}</a>)}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-sm text-white/38 md:flex-row md:items-center md:justify-between">
          <p>© 2026 FISTIK Restoranı. Bütün hüquqlar qorunur.</p>
          <p>Menyu, qalereya və əlaqə axını yenilənib.</p>
        </div>
      </footer>
    </div>
  );
}

