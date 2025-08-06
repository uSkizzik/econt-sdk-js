/**
 * Weekdays
 */
export enum Weekday {
	/**
	 * Monday
	 */
	MONDAY = "monday",
	/**
	 * Tuesday
	 */
	TUESDAY = "tuesday",
	/**
	 * Wednesday
	 */
	WEDNESDAY = "wednesday",
	/**
	 * Thursday
	 */
	THURSDAY = "thursday",
	/**
	 * Friday
	 */
	FRIDAY = "friday",
	/**
	 * Saturday
	 */
	SATURDAY = "saturday",
	/**
	 * Sunday
	 */
	SUNDAY = "sunday"
}

/**
 * A file hosted on Econt's servers
 */
export type HostedFile = {
	id: number
	/**
	 * The name of the hosted file
	 */
	filename: string
	/**
	 * File type (text, xml, application, x-msexcel)
	 */
	mimeType: string
	/**
	 * The URL address of the hosted file
	 */
	URL: string
	/**
	 * The content of the hosted file
	 */
	content: string
}
