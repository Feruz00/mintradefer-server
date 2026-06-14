'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const titles = [
      'Belgiýanyň ýük uçary ilkinji gezek Aşgabat halkara howa menziline gonýar',
      'Gyrgyzystanda geçiriljek halkara oba hojalygy sammitine Türkmenistan gatnaşar',
      'Türkmenistanyň we Azerbaýjanyň gümrük işgärleri konteýner gatnawyna gözegçilik etmek boýunça okuwlara gatnaşdy',
    ];
    const contents = [
      '<p>“Challenge Airlines” howa ýollary, Ningbo (Hytaý) - Aşgabat we Aşgabat - Liege (Belgiýa) ugurlary boýunça Aşgabat halkara howa menzilinde duralga bilen ýük uçuşlaryny ýola goýdy.</p><p><br></p><p>“Challenge Airlines” howa gämisi Liege şäherinde ýerleşýän Belgiýanyň ýük awiakompaniýasydyr. Kompaniýa Europeewropada, Amerikada, Eastakyn Gündogarda we Afrikada howa ýük daşamakda ýöriteleşendir.</p><p><br></p><p>“Challenge Airlines” -dan başga-da, Türkmenistanyň halkara howa menzilleri “Cargolux Airlines S.A.S”, MNG Howaýollary, Moalem Awiasiýa, Mongol Howaýollary we beýlekiler ýaly howa ýollarynyň uçarlaryna hyzmat edýär. Bu, Türkmenistanyň tutuş dünýä bilen söwda we ykdysady gatnaşyklarynyň ösmegine goşant goşýar.</p><p><br></p><p>Iýul aýynyň ahyrynda habar berşimiz ýaly, Türkmenistanyň Belgiýadaky ilçisi Sapar Palwanow, Liege şäherinde ýerleşýän Belgiýanyň ýük awiakompaniýasynyň Challenge howa ýollarynyň ýolbaşçylygy bilen onlaýn duşuşyk geçirdi. Duşuşyga "Türkmenhowaýollary" agentliginiň wekilleri hem gatnaşdy. Taraplar ýük gatnawlaryny amala aşyrmagyň proseduralaryny we “Challenge Airlines” bilen Türkmen raýat awiasiýasynyň arasyndaky hyzmatdaşlygyň beýleki taraplaryny öz içine alýan logistika meselelerini ara alyp maslahatlaşdylar</p>',
      '<p>Türkmenistan “Merkezi Aziýada agrobiznes: integrasiýa.” Halkara sammitine gatnaşar. Döwrebaplaşdyryş. Üstünlik ”atly 27-nji awgustdan 29-njy awgust aralygynda Gyrgyzystanyň Issyk-Kul şäherinde geçiriler.</p><p><br></p><p>Kabar.kg habar bermegine görä, çäre Bosteri obasyndaky Baýtur toplumynda geçiriler.</p><p><br></p><p>Sammit meýilnamasy Merkezi Aziýa ýurtlarynyň agrosenagat toplumynda dik we keseligine integrasiýanyň täsirli modellerine gönükdiriler.</p><p><br></p><p>Sammitiň çäginde döwrebaplaşdyryş çözgütleri hödürlenýän sergi açylar.</p><p><br></p><p>Sammit daýhanlara, oba hojalygynyň kärhanalarynyň ýolbaşçylaryna we hünärmenlerine, oba hojalygy üçin enjamlar we önümçilik serişdeleri bilen üpjün edijilere, işewür birleşikleriň, döwlet edaralarynyň, maliýe pudagynyň, gaýtadan işleýän kärhanalaryň we söwdanyň wekillerine gönükdirilendir.</p><p><br></p><p>Guramaçy, hyzmatdaş guramalar bilen bilelikde DLG (Halkara Oba we Azyk Assosiasiýasy).</p><p><br></p><p>Guramaçylar Gazagystan, Gyrgyzystan, Özbegistan, Türkmenistan we beýleki ýurtlardan 300 töweregi wekiliň gatnaşmagyna garaşýarlar.</p>',
      '<p>Halkara Türkmenbaşy porty (Türkmenistan) we Halkara deňiz porty (Azerbaýjan) port dolandyryş toparlarynyň agzalary konteýnerleriň hereketine gözegçilik etmek boýunça bilelikdäki amaly okuwlara gatnaşdylar.</p><p><br></p><p>Türkmenistanyň gümrük gullugynyň web sahypasyna görä, bu okuw BMG-nyň Neşelere we jenaýatçylyga garşy göreş gullugynyň Merkezi Aziýadaky sebit bölümi tarapyndan UNODC-nyň Global maksatnamasynyň we Bütindünýä gümrük guramasynyň çäginde gurnaldy.</p><p><br></p><p>5 günüň dowamynda bolup geçen bu çäre, dürli bikanun harytlar we beýleki guramaçylykly jenaýat söwdasynda deňiz transportynyň ulanylmagy töwekgelçiligini azaltmak maksady bilen Port Dolandyryş Toparlarynyň agzalarynyň bilim derejesini we tejribesini ýokarlandyrmagy maksat edinýärdi. çäreler.</p><p><br></p><p>Bütindünýä gümrük guramasynyň hünärmenleri halypalyk etdiler. Ilkinji iki gün okuw türkmen tarapynda, soň bolsa Bakuw şäherindäki Alyat deňiz portunda geçirildi.</p><p><br></p><p>Çeşmäniň bellemegine görä, amaly okuw wagtynda gatnaşyjylar tejribe alyşdylar, ýük daşama resminamalaryny bilelikde seljerdiler we ýükleri barladylar, şeýle hem Türkmenbaşy-Alat we arka tarap ýolagçy sanawlaryny ýazdylar.</p>',
    ];
    const types = [1, 2];
    let postCount = 500;
    const arr = [];
    const titleLen = titles.length - 1;
    const contentLen = contents.length - 1;
    const typesLen = types.length - 1;

    while (postCount--) {
      const randomTitle = titles[Math.floor(Math.random() * titleLen)];
      const randomContent = contents[Math.floor(Math.random() * contentLen)];
      const randomCategoryId = types[Math.floor(Math.random() * typesLen)];

      arr.push({
        titleTm: 'Turkmen ' + randomTitle,
        titleEn: 'English ' + randomTitle,
        titleRu: 'Russki ' + randomTitle,

        contentEn: 'English ' + randomContent,
        contentRu: 'Russki ' + randomContent,
        contentTm: 'Turkmen ' + randomContent,
        categoryId: randomCategoryId,
        status: Math.random() > 0.7 ? 'deactive' : 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('tbl_events', arr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_events', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
