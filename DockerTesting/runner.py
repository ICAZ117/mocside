from pty import spawn
from subprocess import run
from sys import exit
import argparse

parser = argparse.ArgumentParser(
                        description='Set language of student code to be run.')
parser.add_argument('-l', '--lang', metavar='lang', type=str, nargs=1,
                        help='Language of student code', required=True)
args = parser.parse_args()

LANG = args.lang[0]


# compile java code
def compile_java():
    compiled = run(['javac', 'Main.java'], capture_output=True, text=True)
    if compiled.returncode != 0:
        print(f'stdout:\n{compiled.stdout}\nstderr:\n{compiled.stderr}')
        exit("Compilation error.")
    return compiled


# run python code
def run_python():
    # We are going to use pty.spawn()
    spawn(['python3', 'submission.py'])
    # In theory, this will give control of our programs stdin and stdout
    # where it will then read from the stream and (hopefully) output to the file.


# run python code
def run_java():
    spawn(['java', 'Main'])


# main method
def main():
    if LANG.lower() == 'python':
        # run python code as pty
        run_python()
    elif LANG.lower() == 'java':
        # compile java code
        compiled = compile_java()
        # and then run as pty
        if compiled:
            run_java()
    else:
        print('Invalid language choice.')


if __name__ == '__main__':
    main()