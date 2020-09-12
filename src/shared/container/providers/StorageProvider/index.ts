import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

import { container } from 'tsyringe';

const providers = {
    disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers.disk,
);
