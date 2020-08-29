import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import { container } from 'tsyringe';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
    'IStorageProvider',
    DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider(),
);
