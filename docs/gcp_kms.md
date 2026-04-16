---
id: gcp_kms
title: GCPKMS
---

# **Google Cloud Platform configuration**

Create a new project or use an existing project and the service accounts used with MavSeal should have the following permissions. It may be achieved by using custom roles (see [https://console.cloud.google.com/iam-admin/roles](https://console.cloud.google.com/iam-admin/roles)) \
Project name is required in the mavseal config.

## **Basic permissions**

* `cloudkms.cryptoKeyVersions.get`
* `cloudkms.cryptoKeyVersions.list`
* `cloudkms.cryptoKeyVersions.viewPublicKey`
* `cloudkms.cryptoKeys.get`
* `cloudkms.cryptoKeys.list`

## **Sign**

* `cloudkms.cryptoKeyVersions.useToSign`

## **Import**

* `cloudkms.cryptoKeyVersions.create`
* `cloudkms.cryptoKeys.create`
* `cloudkms.importJobs.create`
* `cloudkms.importJobs.get`
* `cloudkms.importJobs.list`
* `cloudkms.importJobs.useToImport`

## **Configuration parameters**

Below are the configuration fields which are required for MavSeal.

|||||
|--- |--- |--- |--- |
|Name|Type|Required|Description|
|application_credentials|string|OPTIONAL|Path to the GCP application token JSON file (overrides GOOGLE_APPLICATION_CREDENTIALS environment variable)|
|application_credentials_data|string|OPTIONAL|GCP application token JSON data (overrides application_credentials)|
|project|string|✅|Project name|
|location|string|✅|Location|
|key_ring|string|✅|Key ring name|

## **Key Management**

Under `key management` create a new `key-ring` with any location and create a key with `purpose` as `Asymmetric-sign` and `protection level` as `HSM`.

The key-ring name and location are required in the mavseal configuration.

- Key rings can be found in the security section of your GCP project (Security -> Key Management)
- When creating the key a few things are important:
  - Purpose should be "asymmetric sign"

## **Application Access:**

Providing MavSeal with the permissions to access GCP KMS will differ depending on whether or not MavSeal is running inside or outside of GCP.
One thing that each method has in common is creation of the IAM Service Account:

* Select `IAM & ADMIN` from the menu and select `Service accounts`. Create a new service account or use an existing one with all the above permissions (Get, Sign & Import) granted.

### **Authenticating with the Service Account from outside GCP:**

* Select the created/existing service account and within that create a new key and a prompt to download the application credentials will appear, select the JSON format.
* The downloaded JSON file is needed in mavseal config or can be assigned to the below environment variable.

```sh
export GOOGLE_APPLICATION_CREDENTIALS="mavseal-testing-a7sdfew625aecb.json"
```

### **Authenticating with the Service Account from GCP VM:**

Do not download the service account credentials and place them on MavSeal's file system, and do not use `GOOGLE_APPLICATION_CREDENTIALS` env var. Instead, edit the VM specifications for `Identity and API access` such that it selects the IAM Service Account.

### **Authenticating with the Service Account from GKE pod:**

Do not download the service account credentials and place them on MavSeal's file system, and do not use `GOOGLE_APPLICATION_CREDENTIALS` env var. Best practice is to [use Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)  In short:

* enable Workload Identity on the cluster
* create a kubernetes Service Account and bind it to the IAM Service Account
* annotate the kubernetes Service Account with the email address of the IAM Service Account
* update the pod spec to include the `serviceAccountName` field, this is the name of the kubernetes Service Account

## **Getting a PKH**

```sh
mavseal % ./mavseal-cli list -c /etc/s.yaml
Public Key Hash:    mv3VJ5u5GLRSwfpWpCFvNojEmvc4wNuAGdeQ
Vault:              CloudKMS
ID:                 projects/mavseal-testing/locations/europe-north1/keyRings/sigy-key/cryptoKeys/sigyhsm/cryptoKeyVersions/4
Status:             FOUND_NOT_CONFIGURED
*DISABLED*
```

**Update mavseal.yaml config with the PKH:**

```yaml
server:
  address: :6732
  utility_address: :9583

vaults:
  gcp:
    driver: cloudkms
    config:
      project: <gcp_project>
      location: <gcp_region>
      key_ring: <key_ring_name>
      application_credentials: <credentials_file_path>
mavryk:
  mv3VJ5u5GLRSwfpWpCFvNojEmvc4wNuAGdeQ:
    log_payloads: true
    allow:
      block:
      endorsement:
      preendorsement:
      generic:
        - transaction
```

## **Key Import:**

Users can generate a private key in an air gap environment and then import it into GCP Key Management using `mavseal-cli` binary. Below are the steps to do that.

1. Build `mavseal-cli` binary using `make mavseal-cli`. You need `Golang version 1.15` or later.

2. Use the below command to import the generated private into GCP Key Management. Only `Elliptic Curve P-256 - SHA256` `Digest` is supported now. Below sample key is taken from `mavseal/docs/yubihsm.md`

```sh
% ./mavseal-cli import -c mavseal.yaml --vault kms

INFO[0000] Initializing vault                            vault=cloudkms vault_name=kms
Enter secret key: 
Enter Password: 
Enter Password: INFO[0002] Requesting import operation                   pkh=mv3Tc4EWiM3ZpTKpcYPyrspe3CiQYuMCKFrr vault=CloudKMS vault_name=projects/mavseal-testing/locations/europe-north1/keyRings/sign-ring
INFO[0008] Successfully imported                         key_id=projects/mavseal-testing/locations/europe-north1/keyRings/sign-ring/cryptoKeys/mavseal-imported-215FwcXxhLdlr9IYwzA31vwANmy/cryptoKeyVersions/1 pkh=mv3Tc4EWiM3ZpTKpcYPyrspe3CiQYuMCKFrr vault=CloudKMS vault_name=projects/mavseal-testing/locations/europe-north1/keyRings/sign-ring
```