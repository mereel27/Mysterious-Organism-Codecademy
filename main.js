// Returns a random DNA base
const returnRandBase = () => {
	const dnaBases = ['A', 'T', 'C', 'G'];
		return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
	const newStrand = [];
		for (let i = 0; i < 15; i++) {
		newStrand.push(returnRandBase());
		}
	  	return newStrand;
};

const pAequorFactory = (number, dna=mockUpStrand()) => {
	return {
		specimenNum: number,
		dna: dna,
		mutate() {
			const dnaBases = ['A', 'T', 'C', 'G'];
			let randIndex = Math.floor(Math.random() * dna.length);
			let mutDna = dna.map((el, index) => {
				if (index === randIndex) {
					el = dnaBases.find(x => x !== el);
				}
				return el;
			});
			return this.dna = mutDna;
		},
		compareDna(pAequor) {
			let ownArray = this.dna;
			let toComp = pAequor.dna;
			let common = [];
			for (i = 0; i < ownArray.length; i++) {
				if (ownArray[i] === toComp[i]) {
					common.push(toComp[i]);
				}
			}
			let compare = Math.round(common.length / ownArray.length * 10000) / 100;
			console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${compare}% DNA in common`);
		},
		willLikelySurvive() {
			let cNgCount = this.dna.filter(el => el === 'C' || el === 'G');
			return !(cNgCount.length / this.dna.length < 0.6);
		},
		complementStrand() {
			let array = [];
			let ownArray = Array.from(this.dna);
			for (let i = ownArray.length - 1; i >= 0; i-=2) {
				let element = ownArray[i];
				array.push(ownArray.splice(i, 1));
				switch (element) {
					case 'A':
						array.push(ownArray.splice(ownArray.findIndex(x => x === 'T'), 1));
						break;
					case 'T':
						array.push(ownArray.splice(ownArray.findIndex(x => x === 'A'), 1));
						break;
					case 'C':
						array.push(ownArray.splice(ownArray.findIndex(x => x === 'G'), 1));
						break;
					case 'G':
						array.push(ownArray.splice(ownArray.findIndex(x => x === 'C'), 1));
						break;
					default:
						break;
				}
			}
	  return array.join('').split('');
		}
	}
};

let instances = () => {
	let array = [];
	for (i = 0; i < 30; i++) {
		array.push(pAequorFactory(i));
	}
	return array;
};



/* let dna1 = ['A', 'G', 'C', 'C', 'C', 'A', 'T', 'G', 'A', 'G', 'T', 'A', 'T', 'G', 'T'];
let dna2 = ['T', 'G', 'C', 'T', 'G', 'C', 'T', 'C', 'A', 'G', 'A', 'T', 'G', 'A', 'C'];
let bacteria = pAequorFactory(1, dna1);
let bacteria2 = pAequorFactory(2, dna2);
bacteria.compareDna(bacteria2);
console.log(bacteria.willLikelySurvive());
console.log(instances()); 
console.log(bacteria.complementStrand());*/