class DataHelper {
	public static savedJournalsMasterDataArray: Array<TSJournal> = [];
	public static savedJournalsMasterDataDictionary: any = {};

	public static populateSjmdArrayToDictionary() {
		this.savedJournalsMasterDataDictionary = {}; // reset.
		this.savedJournalsMasterDataArray.forEach(thisJournal => {
			this.savedJournalsMasterDataDictionary[thisJournal.journal_id] = thisJournal;
		});
	}
}
