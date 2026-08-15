# fSEND
code and analyses relating to the SCRAP Lab's fSEND project.


### Preprocessing steps:
##### Step 1: File transfer

After a scan has completed, we first transfer it from the DBIC server and onto our local lab volume. 

On the lab volume (on andes), we create a file, `copy_dbic_paths.txt`, which contains the paths of the scan files, eg:

```
/dartfs/rc/lab/D/DBIC/DBIC/dbic-inbox/DICOM/year/month/day/accession_number
/dartfs/rc/lab/D/DBIC/DBIC/dbic-inbox/DICOM/year/month/day/accession_number
```

Then, we run the bash script: `bash copy_dbic_paths.sh` which copies the imaging files to our volume.

##### Step 2: Convert to BIDS

We run the following heudiconv command, replacing the accession numbers with the ones we’re planning to process:

```bash
heudiconv -f reproin -g accession_number -o bids -s accession_number -c dcm2niix -b --minmeta --overwrite --files /Volumes/Scraplab/fSEND/dicom/accession_number/*/*.dcm
```

Sometimes, the script will place the files in a ‘bids’ folder on the local machine. To check on a Mac, navigate via Finder > ‘Go’ > Go to folder > and enter in the following path: `/Users/your_username/bids/`

#### Step 3: Editing the files

The files of each subject were manually edited in order to successfully run fMRIprep. We first clicked into `bids/` for each accession number and:

1. Opened the `func` folder, and deleted the ‘soundcheck’ files.
2. Opened the `fmap` folder, and opened both .json files in TextEdit. We delete the following nii file: `func/sub-accession_number_task-soundcheck_bold.nii.gz`
3. Opened the `sub-accession_number_scans.tsv` and deleted the ‘soundcheck’ lines.

#### Step 3: Running fMRIprep

Finally, we add the accession numbers to a `.txt` file, `subjects_to_preprocess.txt` and run a `run_fmriprep_slurm` using `sbatch run_fmriprep_slurm`
