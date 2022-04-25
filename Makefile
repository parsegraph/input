DIST_NAME = input

SCRIPT_FILES = \
	src/TouchRecord.ts \
	src/index.ts \
	src/AbstractMouseController.ts \
	src/TouchInput.ts \
	src/MouseInput.ts \
	src/KeyInput.ts \
	src/FocusInput.ts \
	src/addListeners.ts \
	src/Keystroke.ts \
	src/AbstractInput.ts \
	src/demo.ts \
	test/test.ts

EXTRA_SCRIPTS =

include ./Makefile.microproject
