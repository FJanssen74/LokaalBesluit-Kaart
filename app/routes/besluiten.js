import Route from '@ember/routing/route';
class SPARQLQueryDispatcher {
  constructor( endpoint ) {
      this.endpoint = endpoint;
  }

  async query( sparqlQuery ) {
      const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
      const headers = { 'Accept': 'application/sparql-results+json,*/*;q=0.9' };

      const body = await fetch(fullUrl, { headers });
    return await body.json();
  }
}
export default class BesluitenRoute extends Route {

  async model(){
    /* let responses = await fetch('/api/besluiten.json');
      let data_qa = await responses.json();
      const datas_qa = [];
      data_qa.results.bindings.forEach(e => {
      datas_qa.push({
      bestuurseenheidnaam: e.bestuurseenheidnaam.value,
      bestuursclassificatie: e.bestuursclassificatie.value,
      geplandeStart: e.geplandeStart.value,
      location: e.location,
      title: e.title,
      description: e.description,
      motivering: e.motivering,
      nbPro: e.nbPro,
      nbAnti: e.nbAnti,
      nbNoVote: e.nbNoVote
  })
    }) */

      const endpointUrl = 'https://openbelgium-2021.lblod.info/sparql';
      const endpointUrl1 = 'https://qa.centrale-vindplaats.lblod.info/sparql';
    
      const sparqlQuery = `
      PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
      PREFIX bestuursorgaan:<http://data.vlaanderen.be/ns/besluit#Bestuursorgaan>
      PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
      PREFIX mandataris: <http://data.vlaanderen.be/ns/mandaat#Mandataris>
      PREFIX persoon: <http://data.vlaanderen.be/ns/persoon#>
      PREFIX dcterms: <http://purl.org/dc/terms/>
      PREFIX prov: <http://www.w3.org/ns/prov#>
      PREFIX ontology: <http://data.europa.eu/eli/ontology#> 
      PREFIX citeeropschrift: <http://data.europa.eu/eli/ontology#title_short>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/> 
      PREFIX terms: <http://purl.org/dc/terms/> 
      PREFIX isBestuurlijkeAliasVan: <http://data.vlaanderen.be/ns/mandaat#isBestuurlijkeAliasVan>
      PREFIX gebruikteVoornaam: <https://data.vlaanderen.be/ns/persoon#gebruikteVoornaam>
      PREFIX familyName: <http://xmlns.com/foaf/0.1/familyName>
      PREFIX classificatie: <http://data.vlaanderen.be/ns/besluit#classificatie>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX behandelingAgendapunt: <https://data.vlaanderen.be/ns/besluit#BehandelingVanAgendapunt>
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT DISTINCT ?geplandeStart ?location (GROUP_CONCAT(DISTINCT ?aanwezigen; separator = " , ") AS ?aanwezigenInfo) (COUNT(distinct ?aanwezigen) as ?count) ?nbPro ?nbAnti ?nbNoVote ?title ?description ?motivering ?bestuursclassificatie ?bestuurseenheidnaam WHERE {
      ?zitting a besluit:Zitting ;
        besluit:geplandeStart ?geplandeStart;
        besluit:behandelt ?agendapunt .
        ?agendapunt a besluit:Agendapunt .
      OPTIONAL { ?zitting <http://www.w3.org/ns/prov#atLocation> ?location}
      
      BIND(day(now()) AS ?day)
      BIND(IF(?day < 10, "-0", "-") AS ?day2)
      BIND(month(now()) - 2 AS ?month)
      BIND(IF(?month < 10, "-0", "-") AS ?month2) 
      BIND(year(now()) AS ?year)
      BIND(CONCAT(?year, ?month2, ?month, ?day2, ?day) as ?dayTofilter)
      BIND(xsd:date(now()) AS ?time)
      BIND(STRDT(?dayTofilter, xsd:date) AS ?filterDate)

      ?behandelingAgendapunt a besluit:BehandelingVanAgendapunt;
      terms:subject ?agendapunt;
      prov:generated ?decision.
      ?decision ontology:title ?title;
      prov:value ?value;
      ontology:description ?description .
      OPTIONAL {?decision besluit:motivering ?motivering .}


      ?behandelingVanAgendapunt dcterms:subject ?agendapunt ;
                            besluit:heeftStemming ?stemming.
      ?stemming besluit:aantalVoorstanders ?nbPro;
            besluit:aantalTegenstanders ?nbAnti;
            besluit:aantalOnthouders ?nbNoVote.
      ?besluit prov:wasGeneratedBy ?behandelingVanAgendapunt ;
          ontology:title ?title .
      ?zitting besluit:isGehoudenDoor ?bo .  

      OPTIONAL {	?bo a <http://www.w3.org/ns/org#classification> .}
      OPTIONAL {  ?bo <http://www.w3.org/2004/02/skos/core#prefLabel> ?bestuursorgaan .}
        ?bo besluit:classificatie ?classificatie.
        ?classificatie skos:prefLabel ?bestuursclassificatie .
        
        ?bo besluit:bestuurt ?s .
        ?s a besluit:Bestuurseenheid .
        ?s besluit:werkingsgebied [rdfs:label ?bestuurseenheidnaam] .

      OPTIONAL {  ?behandelingAgendapunt a besluit:BehandelingVanAgendapunt; 
      terms:subject ?agendapunt;
      besluit:heeftAanwezige ?aanwezige . 
        ?aanwezige mandaat:isBestuurlijkeAliasVan ?person .
        ?person a <http://www.w3.org/ns/person#Person> .
        ?person persoon:gebruikteVoornaam ?firstName;
              foaf:familyName ?familyName .
      }
      BIND(CONCAT(?firstName, " ", ?familyName) as ?aanwezigen) 
      FILTER (?geplandeStart > ?filterDate)
      }
      GROUP BY ?geplandeStart ?location ?nbPro ?nbAnti ?nbNoVote ?title ?description ?motivering ?bestuursclassificatie ?bestuurseenheidnaam
      ORDER BY DESC(?geplandeStart) ASC(?title)`;
      // FILTER (?geplandeStart > "2021-01-01"^^xsd:date)
    const results = []
    const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl1 );
    const getData = await queryDispatcher.query( sparqlQuery ).then(results)
    const datas = []
    getData.results.bindings.forEach(e => {
    datas.push({
    bestuurseenheidnaam: e.bestuurseenheidnaam.value,
    bestuursclassificatie: e.bestuursclassificatie.value,
    geplandeStart: e.geplandeStart.value,
    location: e.location,
    aanwezigenInfo: e.aanwezigenInfo.value,
    count: e.count.value,
    title: e.title,
    description: e.description,
    motivering: e.motivering,
    nbPro: e.nbPro,
    nbAnti: e.nbAnti,
    nbNoVote: e.nbNoVote
    })
    })
  return datas
}
}
