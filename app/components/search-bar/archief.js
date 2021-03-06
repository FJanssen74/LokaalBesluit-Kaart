import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SearchBarArchiefComponent extends Component {
    @service searchBar;
    @tracked selected;
    @tracked identifier = "hidden"
  
    @action
    onChange(value) {
      this.selected = value;
      this.addToService(this.selected);
      // console.log("work searchbar component", this.selected);
      if(!this.selected){
        // console.log("hello left", this.identifier = "hidden");
        return this.identifier = "hidden";
      }else{
        // console.log("hello right", this.identifier = "visible");
        return this.identifier = "visible";
      }
    }
  
    @action 
      toggleClose() {
        return this.identifier = "hidden";
      }

    @action
    addToService(item){
    this.searchBar.addItem(item)
    // console.log('action add to service', item); // in map hbs use  {{on "click" this.addToService}}
    } 
    
    singleselects = [
      { groupName: 'Provincie Antwerpen', options: [
          'Aartselaar','Antwerpen','Arendonk','Baarle-Hertog','Balen',
          'Beerse','Berlaar','Boechout','Bonheiden','Boom','Bornem',
          'Borsbeek','Brasschaat','Brecht','Dessel','Duffel','Edegem','Essen','Geel',
          'Grobbendonk','Heist-op-den-Berg','Hemiksem','Herentals','Herenthout',
          'Herselt','Hoogstraten','Hove','Hulshout','Kalmthout','Kapellen',
          'Kasterlee','Kontich','Laakdal','Lier','Lille','Lint','Malle','Mechelen',
          'Meerhout','Merksplas','Mol','Mortsel','Niel','Nijlen','Olen','Oud-Turnhout',
          'Putte','Puurs-Sint-Amands','Ranst','Ravels','Retie','Rijkevorsel',
          'Rumst','Schelle','Schilde','Schoten','Sint-Katelijne-Waver',
          'Stabroek','Turnhout','Vorselaar','Vosselaar','Westerlo','Wijnegem',
          'Willebroek','Wommelgem','Wuustwezel','Zandhoven','Zoersel','Zwijndrecht'
        ]
      },
      { groupName: 'Provincie Oost-Vlaanderenn', options: [
        'Aalst','Aalter','Assenede','Berlare','Beveren','Brakel',
        'Buggenhout','De Pinte','Deinze','Denderleeuw','Dendermonde',
        'Destelbergen','Eeklo','Erpe-Mere','Evergem','Gavere',
        'Gent','Geraardsbergen','Haaltert','Hamme','Herzele',
        'Horebeke','Kaprijke','Kluisbergen','Kruibeke','Kruisem',
        'Laarne','Lebbeke','Lede','Lierde','Lievegem','Lochristi',
        'Lokeren','Maarkedal','Maldegem','Melle','Merelbeke','Moerbeke',
        'Nazareth','Ninove','Oosterzele','Oudenaarde','Ronse',
        'Sint-Gillis-Waas','Sint-Laureins','Sint-Lievens-Houtem',
        'Sint-Martens-Latem','Sint-Niklaas','Stekene','Temse','Waasmunster',
        'Wachtebeke','Wetteren','Wichelen','Wortegem-Petegem','Zele',
        'Zelzate','Zottegem','Zulte','Zwalm'
      ] },
      { groupName: 'Provincie West-Vlaanderen', options: [
        'Alveringem','Anzegem','Ardooie','Avelgem','Beernem','Blankenberge',
        'Bredene','Brugge','Damme','De Haan','De Panne','Deerlijk',
        'Dentergem','Diksmuide','Gistel','Harelbeke','Heuvelland','Hooglede',
        'Houthulst','Ichtegem','Ieper','Ingelmunster','Izegem','Jabbeke',
        'Knokke-Heist','Koekelare','Koksijde','Kortemark','Kortrijk',
        'Kuurne','Langemark-Poelkapelle','Ledegem','Lendelede','Lichtervelde',
        'Lo-Reninge','Menen','Mesen','Meulebeke','Middelkerke','Moorslede',
        'Nieuwpoort','Oostende','Oostkamp','Oostrozebeke','Oudenburg','Pittem',
        'Poperinge','Roeselare','Ruiselede','Spiere-Helkijn','Staden','Tielt',
        'Torhout','Veurne','Vleteren','Waregem','Wervik','Wevelgem',
        'Wielsbeke','Wingene','Zedelgem','Zonnebeke','Zuienkerke','Zwevegem'
      ] },
      { groupName: 'Provincie Limburg', options: [
        'Alken','As','Beringen','Bilzen','Bocholt','Borgloon','Bree',
        'Diepenbeek','Dilsen-Stokkem','Genk','Gingelom','Halen','Ham','Hamont-Achel',
        'Hasselt','Hechtel-Eksel','Heers','Herk-de-Stad','Herstappe','Heusden-Zolder',
        'Hoeselt','Houthalen-Helchteren','Kinrooi','Kortessem','Lanaken','Leopoldsburg',
        'Lommel','Lummen','Maaseik','Maasmechelen','Nieuwerkerken','Oudsbergen','Peer',
        'Pelt','Riemst','Sint-Truiden','Tessenderlo','Tongeren','Voeren','Wellen',
        'Zonhoven','Zutendaal'
      ] },
      { groupName: 'Provincie Vlaams-Brabant', options: [
        'Aarschot','Affligem','Asse','Beersel','Begijnendijk','Bekkevoort',
        'Bertem','Bever','Bierbeek','Boortmeerbeek','Boutersem','Diest',
        'Dilbeek','Drogenbos','Galmaarden','Geetbets','Glabbeek','Gooik',
        'Grimbergen','Haacht','Halle','Herent','Herne','Hoegaarden','Hoeilaart',
        'Holsbeek','Huldenberg','Kampenhout','Kapelle-op-den-Bos','Keerbergen',
        'Kortenaken','Kortenberg','Kraainem','Landen','Lennik','Leuven',
        'Liedekerke','Linkebeek','Linter','Londerzeel','Lubbeek','Machelen',
        'Meise','Merchtem','Opwijk','Oud-Heverlee','Overijse','Pepingen','Roosdaal',
        'Rotselaar','Scherpenheuvel-Zichem','Sint-Genesius-Rode',
        'Sint-Pieters-Leeuw','Steenokkerzeel','Ternat','Tervuren',
        'Tielt-Winge','Tienen','Tremelo','Vilvoorde','Wemmel','Wezembeek-Oppem',
        'Zaventem','Zemst','Zoutleeuw'
      ] }
    ]
}
