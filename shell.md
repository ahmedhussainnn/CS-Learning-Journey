# Terminal Instructions


#### Step 1

 
Open the terminal.



#### Step 2

 
Check your current working directory.
```bash
$ pwd 
```


#### Step 3

 
Navigate to the /tmp directory.
```bash
$ cd /tmp 
```


#### Step 4

 
Display the list of files and directories.
```bash
$ ls -la 
```


#### Step 5

 
Create a new directory named exercise.
```bash
$ mkdir exercise 
```


#### Step 6

 
Navigate to the exercise directory.
```bash
$ cd exercise 
```


#### Step 7

 
Create a file named file_1.txt and fill it with "Hello World!".
```bash

$ touch file_1.txt; echo 'Hello World!' > file_1.txt 
```


#### Step 8

 
View the content of the new file_1.txt file.
```bash
$ cat file_1.txt 
```


#### Step 9

 
Prepare a list of files on your Desktop and save it to a variable.
```bash
$ ls ~/Desktop | tr 
```


#### Step 10

 
Create an empty file and write the list of files on your Desktop in it.
```bash

$ touch .hidden_file.txt; echo '$desktop_files' >> .hidden_file.txt 
```


#### Step 11

 
Add the text "This file is confidential" to the end of the hidden file.
```bash
$ echo 'This file is confidential' >> .hidden_file.txt 
```


#### Step 12

 
View the content of the new hidden file.
```bash
$ cat .hidden_file.txt 
```


#### Step 13

 
Return to the home directory.
```bash
$ cd ~ 
```


#### Step 14

 
Create a file named home_file.txt and write "This is a file in my home directory." inside.
```bash

$ touch home_file.txt; echo 'This is a file in my home directory.' > home_file.txt 
```


#### Step 15

 
Transfer home_file.txt to the /tmp/exercise folder.
```bash
$ mv home_file.txt /tmp/exercise 
```


#### Step 16

 
Rename home_file.txt to file_2.txt.
```bash
$ mv /tmp/exercise/home_file.txt /tmp/exercise/file_2.txt 
```


#### Step 17

 
Combine the contents of file_1.txt and file_2.txt into a new file named file_3.txt.
```bash
$ cat file_1.txt file_2.txt > file_3.txt 
```


#### Step 18

 
Review the content of the new file_3.txt file.
```bash
$ cat file_3.txt 
```


#### Step 19

 
Integrate the contents of file_1.txt, file_2.txt, and file_3.txt into the hidden file.
```bash
$ cat file_1.txt file_2.txt file_3.txt >> .hidden_file.txt 
```


#### Step 20

 
Show all files (including hidden ones) under /tmp/exercise.
```bash
$ ls -la /tmp/exercise 
```


#### Step 21

 
Determine the line count of the hidden file.
```bash
$ wc -l < .hidden_file.txt 
```


#### Step 22

 
Identify unique lines in the hidden file.
```bash
$ sort .hidden_file.txt | uniq | wc -l 
```


#### Step 23

 
Locate rows in the hidden file that include the letter 'a'.
```bash
$ grep 'a' .hidden_file.txt 
```


#### Step 24

 
Investigate the owner and permissions of files under /tmp/exercise.
```bash
$ ls -la --color=auto /tmp/exercise 
```


#### Step 25

 
Adjust the permissions of file_1.txt so it is readable, writable, and executable by everyone.
```bash
$ chmod 777 /tmp/exercise/file_1.txt 
```


#### Step 26

 
Delete the /tmp/exercise directory.
```bash
$ rm -r /tmp/exercise/
``` 



#### Step 27

 
Confirm the absence of files in /tmp/exercise.
```bash
$ ls -la /tmp/exercise 
```

#### Step 27

 
List all the commands that you ran for each step.
```bash
$ history
```