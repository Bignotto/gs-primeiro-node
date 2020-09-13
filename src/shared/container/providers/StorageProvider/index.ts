import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import AmazonS3Provider from './implementations/AmazonS3Provider';
import uploadConfig from '@config/upload';

import { container } from 'tsyringe';

const providers = {
    disk: DiskStorageProvider,
    s3: AmazonS3Provider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers[uploadConfig.driver],
);
