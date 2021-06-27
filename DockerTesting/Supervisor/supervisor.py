import subprocess
import sys
import os
import difflib

def main():

	#print("stdout: ", result.stdout)
	#print("stderr: ", result.stderr)
	#result.check_returncode() #checks for a bad exit code and prints error


	#first get the students code...assume it is in the current directory
	lang = "python"
	nCases = sum(len(files) for _, _, files in os.walk(r'./test-cases'))
	nCases = nCases//2
	if(lang=="java"):
		runJava(nCases)
		#student code is submission.java
	else:
		runPython(nCases)
		#student code is submission.py

def runPython(nCases):
	#get names of each test case
	caseNames = [] #includes the .in at the end of each file name
	for _, _, filenames in os.walk(r'./test-cases'):
		for file in filenames:
			fileExt=os.path.splitext(file)[-1]
			if fileExt == ".in":
				caseNames.append(file)

	#loop over the number of test cases
	for i in range(0, nCases):
		#read the test case's input as a string to be used
		with open('./test-cases/'+caseNames[i], 'r') as file:
			data= file.read()

		#run student code with test case input
		result = subprocess.run(['python', 'submission.py'], capture_output=True, text=True, timeout=10, input=data)

		#compare students output to test case output
		model = caseNames[i].split(".")[0] + ".out"
		compare(result, model)


def runJava(nCases):
	#get names of each test case
	caseNames = [] #includes the .in at the end of each file name
	for _, _, filenames in os.walk(r'./test-cases'):
		for file in filenames:
			fileExt=os.path.splitext(file)[-1]
			if fileExt == ".in":
				caseNames.append(file)

	#compile student's java code, if no errors continue
	#else return the error
	compiled = subprocess.run(['javac', 'submission.java'], capture_output=True, text=True)
	if(compiled.stderr != ""):
		print(compiled.stderr)
	else:
		#loop over the number of test cases
		for i in range(0, nCases):
			#read the test case's input as a string to be used
			with open('./test-cases/'+caseNames[i], 'r') as file:
				data= file.read()

			#run student code with test case input
			result = subprocess.run(['java', 'submission'], capture_output=True, text=True, timeout=10, input=data)

			#compare students output to test case output
			model = caseNames[i].split(".")[0]+".out"
			compare(result, model)


def compare(result, model):
	#save results in array? to output for docker to grab

	#check stderr
	#check_returnCode
	#time currently auto stops supervisor and prints
	if(result.stderr != ""):
		print(result.stderr)
	else:
		print(result.stdout)
		with open('./test-cases/'+model, 'r') as file:
				data= file.read()
		print(data)

		s = difflib.SequenceMatcher(isjunk=None, a=result.stdout, b=data)
		difference = round(s.ratio()*100, 2)
		print("percent match: " + str(difference) + "%")
		for block in s.get_matching_blocks():
			print("a[%d] and b[%d] match for %d elements" % block)
			# a[%d] holds the index in a that matches with the index in b
			# b[%d] holds the index in b that matches with the index in a
			# %d holds how many elements are matching 
			#so a[i]..not including i...count %d and all the indexs after that one are incorrect
			#until you reach the next index that they match ie a[%d]
			#we skip index 0 and start counting characters at 1




if __name__ == "__main__":
	main()