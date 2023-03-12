# Yandex Object Storage Action

Upload any number of files to the [Yandex Object Storage](https://cloud.yandex.com/en/services/storage) with [GitHub Actions](https://github.com/features/actions).

## Inputs

| Key                 | Value                                                                                                                                      | Default value  | Required |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|----------------|----------|
| `access-key-id`     | The ID of the key that you received when [generating the static key](https://cloud.yandex.com/en/docs/iam/operations/sa/create-access-key) |                | ✔️       |
| `secret-access-key` | The secret key that you received when [generating the static key](https://cloud.yandex.com/en/docs/iam/operations/sa/create-access-key)    |                | ✔️       |
| `bucket`            | Bucket name                                                                                                                                |                | ✔️       |
| `path`              | Path to upload folder                                                                                                                      |                | ✔️       |
| `clear`             | Clear bucket before deploy                                                                                                                 | `false`        | ➖        |

## Example

You need to upload the `build` folder to Yandex Object Storage bucket `test.company.com`.

### File structure

```
├── build
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   └── assets
│       ├── image.webp
│       └── favicon.svg
├── src
│   ├── index.html
│   └── ...
├── package.json
└── package-lock.json
```

### GitHub Actions secrets

```json
{
  "ACCESS_KEY_ID": "XXXXXXXXXXXXXXXXXXXXXXXXX",
  "SECRET_ACCESS_KEY": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "BUCKET": "test.company.com"
}
```

### Action Workflow template

```yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
        
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      # Build
      - run: npm ci
      - run: npm run build
        
      # Deploy
      - uses: povetek/yandex-object-storage-action@v3
        with:
          access-key-id: ${{ secrets.ACCESS_KEY_ID }}
          secret-access-key: ${{ secrets.SECRET_ACCESS_KEY }}
          bucket: ${{ secrets.BUCKET }}
          path: build
          clear: true
```

## Comparison

| Action Name                                                                                                                             | Action Size | AWS SDK Version |
|-----------------------------------------------------------------------------------------------------------------------------------------|-------------|-----------------|
| Yandex Object Storage Action `Povetek`                                                                                                  | 1.15 MB     | V3              |
| [Yandex Cloud S3 Sync](https://github.com/marketplace/actions/yandex-cloud-s3-sync) `sergeevpasha`                                      | 1.17 MB     | V3              |
| [Yandex.Cloud Object Storage Upload (S3)](https://github.com/marketplace/actions/yandex-cloud-object-storage-upload-s3) `MrMeison`      | 2.88 MB     | V3              |
| [Yandex object storage website management](https://github.com/marketplace/actions/yandex-object-storage-website-management) `AntGrisha` | 7.87 MB     | V2              |
| [Upload to Yandex S3 Object Storage](https://github.com/marketplace/actions/upload-to-yandex-s3-object-storage) `paulvstrashnov`        | 8.08 MB     | V2              |
| [Yandex object storage static website](https://github.com/marketplace/actions/yandex-object-storage-static-website) `NekitCorp`         | 8.90 MB     | V2              |
| [YC Object Storage Upload](https://github.com/marketplace/actions/yc-object-storage-upload) `yc-actions`                                | 19.7 MB     | V3              |

## Licence

[MIT](./LICENSE)
