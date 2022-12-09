export interface Photo {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
    isCar: boolean;
    isDrivingLicence: boolean;
    isApproved: boolean;
}
