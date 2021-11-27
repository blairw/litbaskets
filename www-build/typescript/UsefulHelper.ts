class UsefulHelper {
	public static nvl(value: any, fallbackValue: any) {
		return typeof value !== 'undefined' && value != null
			? value
			: fallbackValue;
	}
}
