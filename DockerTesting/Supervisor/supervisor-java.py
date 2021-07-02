import subprocess
# import sys
import os
import difflib
from json import dumps

def main():

	#print("stdout: ", result.stdout)
	#print("stderr: ", result.stderr)
	#result.check_returncode() #checks for a bad exit code and prints error


	#first get the number of test cases
	nCases = sum(len(files) for _, _, files in os.walk(r'./test-cases'))
	nCases = nCases//2
    #student code is submission.java
	outs = runJava(nCases)
	for case in outs:
		for out in case:
			print(dumps(out))


def runJava(nCases):
	run_outs = []
	#get names of each test case
	caseNames = [] #includes the .in at the end of each file name
	for _, _, filenames in os.walk(r'./test-cases'):
		for file in filenames:
			fileExt=os.path.splitext(file)[-1]
			if fileExt == ".in":
				caseNames.append(file)

	#compile student's java code, if no errors continue
	#else return the error
	compiled = subprocess.run(['javac', 'Main.java'], capture_output=True, text=True)
	if(compiled.stderr != ""):
		# print(compiled.stderr)
		temp = []
		temp.append(compiled.stderr)
		run_outs.append(["compilationError", temp, "compilationError", "compilationError"])
	else:
		#loop over the number of test cases
		for i in range(0, nCases):
			#read the test case's input as a string to be used
			with open('./test-cases/'+caseNames[i], 'r') as file:
				data = file.read()

			#run student code with test case input
			result = subprocess.run(['java', 'Main'], capture_output=True, text=True, timeout=10, input=data)

			#compare students output to test case output
			model = caseNames[i].split(".")[0]+".out"
			run_outs.append([caseNames[i].split('.')[0]])
			run_outs.append(compare(result, model))
	return run_outs


def compare(result, model):
	#save results in array? to output for docker to grab

	#check stderr
	#check_returnCode
	#time currently auto stops supervisor and prints
	compare_outs = []
	if(result.stderr != ""):
		# print(result.stderr)
		temp = []
		temp.append(result.stderr)
		compare_outs.append([temp])
		compare_outs.append("runtimeError")
		compare_outs.append("runtimeError")
	else:
		# print(result.stdout)
		temp = []
		temp.append(result.stdout)
		compare_outs.append(temp)
		with open('./test-cases/'+model, 'r') as file:
				data = file.read()
		# print(data)
		temp = []
		temp.append(data)
		compare_outs.append(temp)

		s = difflib.SequenceMatcher(isjunk=None, a=result.stdout, b=data)
		# table = difflib.HtmlDiff().make_table([data], [result.stdout], 'Expected output', 'Your output')
		difference = round(s.ratio()*100, 2)
		# print("percent match: " + str(difference) + "%")
		temp = []
		temp.append(str(difference))
		for block in s.get_matching_blocks():
			# print("a[%d] and b[%d] match for %d elements" % block)
			temp.append("%d,%d,%d" % block)
			# a[%d] holds the index in a that matches with the index in b
			# b[%d] holds the index in b that matches with the index in a
			# %d holds how many elements are matching 
			#so a[i]..not including i...count %d and all the indexs after that one are incorrect
			#until you reach the next index that they match ie a[%d]
			#we skip index 0 and start counting characters at 1
		compare_outs.append(temp)
		# compare_outs.append(table)
	return compare_outs




if __name__ == "__main__":
	main()