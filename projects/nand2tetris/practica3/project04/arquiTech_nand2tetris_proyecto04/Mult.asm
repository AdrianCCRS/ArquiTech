// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/4/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
// The algorithm is based on repetitive addition.

(CARGA_R2)
@R2
M=0

(MULT_LOOP)
    //Comprobar que el valor en R1 >= 0
    @R1
    D=M
    @END
    D;JLE

    //Hacer la operación R2 = R2 + R0
    @R0
    D=M
    @R2
    M=D+M

    //Decrementar R1 
    @R1
    M=M-1

    //Llamamos el lipp
    @MULT_LOOP
    0;JMP  

(FIN)
    @FIN
    0;JMP

