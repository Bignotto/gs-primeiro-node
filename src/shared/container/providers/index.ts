import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
    'IStorageProvider',
    DiskStorageProvider,
);
