console.log("jt-remover.js");
// var element = document.getElementById("jtarticle");
// element.style.border = "10px solid green";

// This is a strict text replacement. It cannot be used to add tags.
function replaceText(pattern, string, {target = document.body} = {}) {
  [target,
    ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
  ].forEach(({childNodes: [...nodes]}) => nodes
    .filter(({nodeType}) => nodeType === document.TEXT_NODE)
    .forEach((textNode) => textNode.textContent = textNode.textContent.replace(pattern, string)));
};

console.log("Defined replaceText()");

// This strips out all hiragana and katakana appearing alone between parentheses.
// replaceText(/\([\u3040-\u309Fー\u30A0-\u30FF]*\)/g, "")

// This identifies the leading kanji.
// replaceText(/([\u4E00-\u9FFF]*)\([\u3040-\u309Fー\u30A0-\u30FF]*\)/g, "$1")

const hiragana = '[ぁ-んー]';
const joyo1 = '一九七二人入八力十下三千上口土夕大女子小山川五天中六円手文日月' +
  '木水火犬王正出本右四左玉生田白目石立百年休先名字早気竹糸耳虫村男町花見貝赤' +
  '足車学林空金雨青草音校森';
const joyo2 = '刀万丸才工弓内午少元今公分切友太引心戸方止毛父牛半市北古台兄冬' +
  '外広母用矢交会合同回寺地多光当毎池米羽考肉自色行西来何作体弟図声売形汽社角' + 
  '言谷走近里麦画東京夜直国姉妹岩店明歩知長門昼前南点室後春星海活思科秋茶計風' +
  '食首夏弱原家帰時紙書記通馬高強教理細組船週野雪魚鳥黄黒場晴答絵買朝道番間雲' +
  '園数新楽話遠電鳴歌算語読聞線親頭曜顔';
const upToJoyo2 = joyo1 + joyo2;
const joyo3 = '丁予化区反央平申世由氷主仕他代写号去打皮皿礼両曲向州全次安守式' +
  '死列羊有血住助医君坂局役投対決究豆身返表事育使命味幸始実定岸所放昔板泳注波' +
  '油受物具委和者取服苦重乗係品客県屋炭度待急指持拾昭相柱洋畑界発研神秒級美負' +
  '送追面島勉倍真員宮庫庭旅根酒消流病息荷起速配院悪商動宿帳族深球祭第笛終習転' +
  '進都部問章寒暑植温湖港湯登短童等筆着期勝葉落軽運遊開階陽集悲飲歯業感想暗漢' +
  '福詩路農鉄意様緑練銀駅鼻横箱談調橋整薬館題';
const upToJoyo3 = upToJoyo2 + joyo3;
const joyo4 = '士不夫欠氏民史必失包末未以付令加司功札辺印争仲伝共兆各好成灯老' +
  '衣求束兵位低児冷別努労告囲完改希折材利臣良芸初果刷卒念例典周協参固官底府径' +
  '松毒泣治法牧的季英芽単省変信便軍勇型建昨栄浅胃祝紀約要飛候借倉孫案害帯席徒' +
  '挙梅残殺浴特笑粉料差脈航訓連郡巣健側停副唱堂康得救械清望産菜票貨敗陸博喜順' +
  '街散景最量満焼然無給結覚象貯費達隊飯働塩戦極照愛節続置腸辞試歴察旗漁種管説' +
  '関静億器賞標熱養課輪選機積録観類験願鏡競議';
const upToJoyo4 = upToJoyo3 + joyo4;
const joyo5 = '久仏支比可旧永句圧弁布刊犯示再仮件任因団在舌似余判均志条災応序' +
  '快技状防武承価舎券制効妻居往性招易枝河版肥述非保厚故政査独祖則逆退迷限師個' +
  '修俵益能容恩格桜留破素耕財造率貧基婦寄常張術情採授接断液混現略眼務移経規許' +
  '設責険備営報富属復提検減測税程絶統証評賀貸貿過勢幹準損禁罪義群墓夢解豊資鉱' +
  '預飼像境増徳慣態構演精総綿製複適酸銭銅際雑領導敵暴潔確編賛質興衛燃築輸績講' +
  '謝織職額識護';
const upToJoyo5 = upToJoyo4 + joyo5;
const joyo6 = '亡寸己干仁尺片冊収処幼庁穴危后灰吸存宇宅机至否我系卵忘孝困批私' +
  '乱垂乳供並刻呼宗宙宝届延忠拡担拝枚沿若看城奏姿宣専巻律映染段洗派皇泉砂紅背' +
  '肺革蚕値俳党展座従株将班秘純納胸朗討射針降除陛骨域密捨推探済異盛視窓翌脳著' +
  '訪訳欲郷郵閉頂就善尊割創勤裁揮敬晩棒痛筋策衆装補詞貴裏傷暖源聖盟絹署腹蒸幕' +
  '誠賃疑層模穀磁暮誤誌認閣障劇権潮熟蔵諸誕論遺奮憲操樹激糖縦鋼厳優縮覧簡臨難' +
  '臓警';
const upToJoyo6 = upToJoyo5 + joyo6;
const joyo9 = '乙了又与及丈刃凡互弔井升丹乏屯介冗凶刈匹厄双孔幻斗斤且丙甲凸丘' +
  '斥仙凹召巨占囚奴尼巧払汁玄甘矛込弐朱吏劣充妄企仰伐伏刑旬旨匠叫吐吉如妃尽帆' +
  '忙扱朽朴汚汗江壮缶肌舟芋芝巡迅亜更寿励含佐伺伸但伯伴呉克却吟吹呈壱坑坊妊妨' +
  '妙肖尿尾岐攻忌床廷忍戒戻抗抄択把抜扶抑杉沖沢沈没妥狂秀肝即芳辛迎邦岳奉享盲' +
  '依佳侍侮併免刺劾卓叔坪奇奔姓宜尚屈岬弦征彼怪怖肩房押拐拒拠拘拙拓抽抵拍披抱' +
  '抹昆昇枢析杯枠欧肯殴況沼泥泊泌沸泡炎炊炉邪祈祉突肢肪到茎苗茂迭迫邸阻附斉甚' +
  '帥衷幽為盾卑哀亭帝侯俊侵促俗盆冠削勅貞卸厘怠叙咲垣契姻孤封峡峠弧悔恒恨怒威' +
  '括挟拷挑施是冒架枯柄柳皆洪浄津洞牲狭狩珍某疫柔砕窃糾耐胎胆胞臭荒荘虐訂赴軌' +
  '逃郊郎香剛衰畝恋倹倒倣俸倫翁兼准凍剣剖脅匿栽索桑唆哲埋娯娠姫娘宴宰宵峰貢唐' +
  '徐悦恐恭恵悟悩扇振捜挿捕敏核桟栓桃殊殉浦浸泰浜浮涙浪烈畜珠畔疾症疲眠砲祥称' +
  '租秩粋紛紡紋耗恥脂朕胴致般既華蚊被託軒辱唇逝逐逓途透酌陥陣隻飢鬼剤竜粛尉彫' +
  '偽偶偵偏剰勘乾喝啓唯執培堀婚婆寂崎崇崩庶庸彩患惨惜悼悠掛掘掲控据措掃排描斜' +
  '旋曹殻貫涯渇渓渋淑渉淡添涼猫猛猟瓶累盗眺窒符粗粘粒紺紹紳脚脱豚舶菓菊菌虚蛍' +
  '蛇袋訟販赦軟逸逮郭酔釈釣陰陳陶陪隆陵麻斎喪奥蛮偉傘傍普喚喫圏堪堅堕塚堤塔塀' +
  '媒婿掌項幅帽幾廃廊弾尋御循慌惰愉惑雇扉握援換搭揚揺敢暁晶替棺棋棚棟款欺殖渦' +
  '滋湿渡湾煮猶琴畳塁疎痘痢硬硝硫筒粧絞紫絡腕葬募裕裂詠詐詔診訴越超距軸遇遂遅' +
  '遍酢鈍閑隅随焦雄雰殿棄傾傑債催僧慈勧載嗣嘆塊塑塗奨嫁嫌寛寝廉微慨愚愁慎携搾' +
  '摂搬暇楼歳滑溝滞滝漠滅溶煙煩雅猿献痴睡督碁禍禅稚継腰艇蓄虞虜褐裸触該詰誇詳' +
  '誉賊賄跡践跳較違遣酬酪鉛鉢鈴隔雷零靴頑頒飾飽鼓豪僕僚暦塾奪嫡寡寧腐彰徴憎慢' +
  '摘概雌漆漸漬滴漂漫漏獄碑稲端箇維綱緒網罰膜慕誓誘踊遮遭酵酷銃銘閥隠需駆駄髪' +
  '魂錬緯韻影鋭謁閲縁憶穏稼餓壊懐嚇獲穫潟轄憾歓環監緩艦還鑑輝騎儀戯擬犠窮矯響' +
  '驚凝緊襟謹繰勲薫慶憩鶏鯨撃懸謙賢顕顧稿衡購墾懇鎖錯撮擦暫諮賜璽爵趣儒襲醜獣' +
  '瞬潤遵償礁衝鐘壌嬢譲醸錠嘱審薪震髄澄瀬請籍潜繊薦遷鮮繕礎槽燥藻霜騒贈濯濁諾' +
  '鍛壇鋳駐懲聴鎮墜締徹撤謄踏騰闘篤曇縄濃覇輩賠薄爆縛繁藩範盤罷避賓頻敷膚譜賦' +
  '舞覆噴墳憤幣弊壁癖舗穂簿縫褒膨謀墨撲翻摩磨魔繭魅霧黙躍癒諭憂融慰窯謡翼羅頼' +
  '欄濫履離慮寮療糧隣隷霊麗齢擁露藤誰俺岡頃奈阪韓弥那鹿斬虎狙脇熊尻旦闇籠呂亀' +
  '頬膝鶴匂沙須椅股眉挨拶鎌凄謎稽曾喉拭貌塞蹴鍵膳袖潰駒剥鍋湧葛梨貼拉枕顎苛蓋' +
  '裾腫爪嵐鬱妖藍捉宛崖叱瓦拳乞呪汰勃昧唾艶痕諦餅瞳唄隙淫錦箸戚妬蔑嗅蜜戴痩怨' +
  '醒詣窟巾蜂骸弄嫉罵璧阜埼伎曖餌爽詮芯綻肘麓憧頓牙咽嘲臆挫溺侶丼瘍僅諜柵腎梗' +
  '瑠羨酎畿畏瞭踪栃蔽茨慄傲虹捻臼喩萎腺桁玩冶羞惧舷貪采堆煎斑冥遜旺麺璃串填箋' +
  '脊緻辣摯汎憚哨氾諧媛彙恣聘沃憬捗訃';
const allJoyo = upToJoyo6 + joyo9;

const wk1 = '上下大工八入山口九一人力川七十三二女';
const upToWK1 = wk1;
const wk2 = '又玉本子丸正犬夕出目了火五四才手天王左中月々田右六小土立石丁日刀千木水白文円';
const upToWK2 = upToWK1 + wk2;
const wk3 = '矢市牛切方戸太父少友毛半心内生久台母午北今古兄元外分公引止用万広冬';
const upToWK3 = upToWK2 + wk3;
const wk4 = '竹車央写仕耳早気平花足世打百氷虫字男主名不号他去皿先赤休申見貝皮代礼糸町村年';
const upToWK4 = upToWK3 + wk4;
const wk5 = '角青体色来社当図毎羽林行金草里作多肉会交近池雨米走同言自売形空音学光考回谷声西何麦弟';
const upToWK5 = upToWK4 + wk5;
const wk6 = '全後血両明京化国死亡画地東食直前有知活長曲首次夜姉点安室科海羊店南星州茶思歩向妹';
const upToWK6 = upToWK5 + wk6;
const wk7 = '辺付札鳥黒船以必末氏失魚組家欠未紙通民理由校雪強夏高教時弱週風記黄';
const upToWK7 = upToWK6 + wk7;
const wk8 = '答反君局買雲楽数決絵住電森助馬間場医朝番所究道役研身者合支話投対';
const upToWK8 = upToWK7 + wk8;
const wk9 = '受事美予始服度発定談表客重持負相要新部和県返乗屋送苦泳仮物具実使待勝界';
const upToWK9 = upToWK8 + wk9;
const wk10 = '進酒業算運漢鳴集配飲終顔落農速頭聞院調鉄語葉習軽線最開親読転路病横歌起';
const upToWK10 = upToWK9 + wk10;
const wk11 = '功成岸競争便老命指初味追神良意労好昔低育令拾注利級位仲放秒別特共努伝戦波洋働';
const upToWK11 = upToWK10 + wk11;
const wk12 = '悪息章登寒深倍勉消祭野階庭港暑湯島童員商都動第期植根悲短球泉流陽歯族旅温着';
const upToWK12 = upToWK11 + wk12;
const wk13 = '皆謝整橋選想器暗疑料情感様養緑熱億殺宿福鏡然詩練賞問館映願士課標銀駅像題輪';
const upToWK13 = upToWK12 + wk13;
const wk14 = '能芸術雰骨束周協例折基性妥卒固望私材参完松約残求季技格頑囲的念希';
const upToWK14 = upToWK13 + wk14;
const wk15 = '紀軍秋信岩仏建猫変晴築勇泣司区英丈夫飯計法晩昼毒昨帰式列浅単坂春寺';
const upToWK15 = upToWK14 + wk15;
const wk16 = '浴箱係治危冒留弁証存遠園門府幸阪急笑荷政保品守辞真喜関険典専冗面取曜書';
const upToWK16 = upToWK15 + wk16;
const wk17 = '是結底因識干敗渉果官署察堂幻非愛薬覚常鼻無原栄恋塩席側兵説細梅虚警';
const upToWK17 = upToWK16 + wk17;
const wk18 = '告達焼借弓脳胸喫等枚忘訓種報句許可祈僧禁静座煙汽験試類洗禅';
const upToWK18 = upToWK17 + wk18;
const wk19 = '得加冊履忙閥布比歴続減昆困易絡笛容団史徒宙混善順宇詞改乱節連舌暴財若';
const upToWK19 = upToWK18 + wk19;
const wk20 = '裕尻確械犯害議難災嫌夢震在飛産罪穴被個機妨倒経率圧防臭余尾論厚妻';
const upToWK20 = upToWK19 + wk20;
const wk21 = '責条済委省制批断任素敵設評検岡増査判審件際企挙認資義権派務税解総';
const upToWK21 = upToWK20 + wk21;
const wk22 = '援態誕状賀各費姿勢示寝営坊罰案策提置域応宮吸過領脱統価値副観藤';
const upToWK22 = upToWK21 + wk22;
const wk23 = '呼崎施城護鬼割職秀俳停宅裁律導革贅乳収演現備則規準張優沢師幹看';
const upToWK23 = upToWK22 + wk23;
const wk24 = '庁額腕境燃担祝届違差象展層視環製述武型狭管載質量販供肩株触輸腰';
const upToWK24 = upToWK23 + wk24;
const wk25 = '慣居逮票属捕候輩況響効抜鮮満与掛隠模含訟限肥豊替景巻捜構影絞訴補渡';
const upToWK25 = upToWK24 + wk25;
const wk26 = '接再独獣菓討故較創造往励激占障我徴授鉛郵針従豚復河貯印振突刺怪汗筆';
const upToWK26 = upToWK25 + wk26;
const wk27 = '怒昇迷招腹睡端極郎康健誘貸惑痛退途給就靴眠暇段胃症濃締迫訪織悩屈';
const upToWK27 = upToWK26 + wk27;
const wk28 = '攻撃浜綺益児憲冷処微修博程絶凍巨稚幼並麗奇衆清潔録逆移精隊庫妙券傘婦';
const upToWK28 = upToWK27 + wk28;
const wk29 = '略積添寄宴板壊督僚杯娘診乾欧恐猛江韓雄航監宗請怖索臣催街詰緊閣促烈';
const upToWK29 = upToWK28 + wk29;
const wk30 = '更魅背騒飾預詳版旗浮越照漏系覧婚懐撮枕遊快貧延押乏盗購適翌渇符';
const upToWK30 = upToWK29 + wk30;
const wk31 = '帯廊離径融均除貨孫墓幾尋編陸探豪鑑泥巣普棒粉既救似富散華嘆偵驚掃菜脈徳倉';
const upToWK31 = upToWK30 + wk31;
const wk32 = '酸賛祖銭込衛机汚飼複染卵永績眼液採党志興恩序雑桜密秘厳捨訳欲暖迎傷';
const upToWK32 = upToWK31 + wk32;
const wk33 = '灰装著裏閉垂漠異皇拡暮忠肺誌操筋否盛宣賃敬尊熟砂簡蒸蔵糖納宝諸窓';
const upToWK33 = upToWK32 + wk33;
const wk34 = '豆枝揮刻爪承幕紅歓降劇奴聖推臓損磁誤源芋純薦丼腐沿射縮隷粋吐貴縦勤拝 ';
const upToWK34 = upToWK33 + wk34;
const wk35 = '熊噌彫杉銅舎酔炎彼紹介湖講寿測互油己払鍋獄為恥遅汁醤滞剣破亀厄酢';
const upToWK35 = upToWK34 + wk35;
const wk36 = '諾盟将舞債伎鹿換牙旧般津療継遺維奈核廃献沖摘及依縄踏伸姓甘貿頼超幅';
const upToWK36 = upToWK35 + wk36;
const wk37 = '患狙陣塁弾葬抗崩遣掲爆恵漁香湾跳抱旬聴臨兆契刑募償抵戻昭闘執跡削';
const upToWK37 = upToWK36 + wk37;
const wk38 = '伴齢宜賂賄房慮託却需致避描刊逃扱奥併傾緩奏娠妊贈択還繰抑懸称緒盤';
const upToWK38 = upToWK37 + wk38;
const wk39 = '控充渋岐埋鈴埼棋譲雇免群枠銃仙邦御慎躍謙阜片項斐隆圏勧拒稲奪鋼甲壁祉';
const upToWK39 = upToWK38 + wk39;
const wk40 = '敏吹唱衝戒兼薄堀剤雅孝頻駆俊誉茂殿殖隣繁巡柱携褒排駐顧犠獲鋭敷透';
const upToWK40 = upToWK39 + wk40;
const wk41 = '棄至拠蜂儀炭衣潜偽畑蛍拳郷蜜仁遜侵鉱伺徹瀬墟酎措誠虎艦撤樹包';
const upToWK41 = upToWK40 + wk41;
const wk42 = '析弧到軸綱挑焦掘紛範括床握枢揚潟芝肝喪網克泊双柄哲斎袋揺滑堅暫糾荒';
const upToWK42 = upToWK41 + wk42;
const wk43 = '襲沼朗摩懲慰懇筒滅距籍露炉柔趣擦琴垣即威滋牧泰岳旨刷珍封斉沈撲裂潮貢誰';
const upToWK43 = upToWK42 + wk43;
const wk44 = '刃砲笠竜縁忍釣吉粒髪丘僕俺斗寸桃梨姫娯謎侍叱棚叫匹辛芽嵐涙雷缶塔朱翼';
const upToWK44 = upToWK43 + wk44;
const wk45 = '頃菌鐘舟嫁暦曇也塾呪湿稼疲翔賭霊溝矛狩脚澄塊狂嬢裸磨陰肌魂眺硬卓凶滝井';
const upToWK45 = upToWK44 + wk45;
const wk46 = '墨瞬泡穏孔椅菊涼綿魔寮鳩鈍鍛碁癖穂吾鍵盆庄猿棟誇瞳寧俵幽架黙斬帝租錬阻歳零';
const upToWK46 = upToWK45 + wk46;
const wk47 = '幣箸瞭崖炊粧墜欺滴塀霧扇扉恨帽憎佐挿伊詐如唇掌婆哀虹爽憩尺砕粘畳胴巾芯柳';
const upToWK47 = upToWK46 + wk47;
const wk48 = '遂蓄脇殴咲鉢賢彩隙培踊闇斜尽霜穫麻騎辱灯畜溶蚊帳塗貼輝憶悔耐盾蛇班飢餓迅脅';
const upToWK48 = upToWK47 + wk48;
const wk49 = '概拘煮覆駒悟謀鶴拓衰奨淡礎陛浸劣勘隔桑尼珠抽壇陶妃刈紫唯剛征誓俗潤';
const upToWK49 = upToWK48 + wk49;
const wk50 = '偶巧鰐把駄洞伯唐彰諮廷蟹晶堰漂淀堤后疫翻鬱涯銘仰漫簿亭訂壮軌奮峰墳搬邪 ';
const upToWK50 = upToWK49 + wk50;
const wk51 = '肯浦挟沸瓶召貞亮襟隅郡燥釈脂偉軒蓮慈塚玄肪耕媛邸喚苗隻膚軟郊頂濯渦聡枯';
const upToWK51 = upToWK50 + wk51;
const wk52 = '祥呂偏茨陥鎖賠恒綾没擁遭噴殊倫陳隼乃輔猟唆惰怠覇須牲秩孤芳貫糧颯慢膨遇';
const upToWK52 = upToWK51 + wk52;
const wk53 = '諭随胡搭錦鯉胞浄帥諒蒙曙惨稿啓披繊徐葵騰据莉緯瓜虐戴艇丹緋准舗壌駿剰寛';
const upToWK53 = upToWK52 + wk53;
const wk54 = '庶且顕杏栞欄冠酷叙逸紋阿愚尚拐悠勲疎謡哺栽践呈傲疾茜酬呆鎌粛茎痴荘鯨卸';
const upToWK54 = upToWK53 + wk54;
const wk55 = '累伏虜循粗凝栓瑛旦奉遼郭抹佳惜憂悼癒栃龍弥髄傍愉赴昌憾朴脊該之鎮尿賓那';
const upToWK55 = upToWK54 + wk55;
const wk56 = '匠拍縛飽柴蝶弦凛庸錯轄悦窮嘉弊遥洪紳呉穀摂寂宰陵凡尉靖恭縫舶搾猶窒碑智';
const upToWK56 = upToWK55 + wk56;
const wk57 = '款鼓盲醸凹弔凸烏敢堕衡伐酵閲遮腸瑠乙楓膜紺蒼漬哉峡賊旋俸喝羅萌槽坪遍胎';
const upToWK57 = upToWK56 + wk57;
const wk58 = '陪扶迭鶏瑞暁剖凌藩譜璃淑傑殻錠媒忌濁椎赦戯享嘱肖憤漣朽奔帆菅酌慨絹窃硫';
const upToWK58 = upToWK57 + wk58;
const wk59 = '亜屯岬鋳拙詠慶酪篤侮堪禍雌睦胆擬漆閑憧卑姻曹吟礁峠沙蔑汰紡遷叔甚浪梓崇';
const upToWK59 = upToWK58 + wk59;
const wk60 = '煩蛮廉劾某矯囚痢逝狐漸升婿匿謹藍桟殉坑罷妄藻泌唄畔倹拷醜渓湧寡慕';
const upToWK60 = upToWK59 + wk60;

// replaceText(new RegExp(`([${joyo1}]+)\\(${hiragana}+\\)`, 'g'), "$1");

const myLevel = upToWK50;

replaceText(new RegExp(`([${myLevel}]+)[\\(（]${hiragana}+[\\)）]`, 'g'), "$1");

// Remove all hints on Joyo 1 kanji.
// replaceText(/([一九七二人入八力十下三千上口土夕大女子小山川五天中六円手文日月木水火犬王正出本右四左玉生田白目石立百年休先名字早気竹糸耳虫村男町花見貝赤足車学林空金雨青草音校森]*)\([\u3040-\u309Fー\u30A0-\u30FF]*\)/, "$1");
