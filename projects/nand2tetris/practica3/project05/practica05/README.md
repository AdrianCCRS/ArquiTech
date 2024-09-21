# Descripción General

El Proyecto 5 de Nand2Tetris consiste en implementar la CPU y el chip de memoria del computador Hack. 
Estos módulos ejecutan instrucciones y gestionan la memoria (RAM, pantalla, y teclado). Finalmente, 
integras ambos componentes en el chip de la computadora completa, capaz de ejecutar programas en lenguaje máquina Hack.

## 1. Memory
```` hdl
CHIP Memory {
    IN in[16], load, address[15];
    OUT out[16];

    PARTS:
	//// Replace this comment with your code.
    DMux4Way(in=load, sel=address[13..14], a=loadram1, b=loadram2, c=loadscreen, d=loadkbd);
	Or(a=loadram1, b=loadram2, out=loadram);
    RAM16K(in=in, load=loadram, address=address[0..13], out=ramout);
    Screen(in=in, load=loadscreen, address=address[0..12], out=scrout);
    Keyboard(out=kbout);
    Mux4Way16(a=ramout, b=ramout, c=scrout, d=kbout, sel=address[13..14], out=out);
} 
````
### Selección de Memoria con DMux4Way

Para decidir a qué región de la memoria se debe escribir o leer, tomamos los **dos primeros bits** de la dirección (`address[13..14]`). Estos dos bits actúan como **selectores** para el **DMux4Way**, un demultiplexor de cuatro vías que dirige la operación de carga (`load`) hacia la región de memoria correspondiente. Las regiones posibles son:

- **RAM16K**: Seleccionada cuando los bits `address[13..14]` son `00` o `01`, dividiendo la RAM en dos mitades.
- **Pantalla (Screen)**: Seleccionada cuando `address[13..14] == 10`, lo que permite acceder a la memoria destinada a la representación gráfica.
- **Teclado (Keyboard)**: Seleccionada cuando `address[13..14] == 11`, lo que indica que la operación está accediendo al estado actual del teclado, aunque este es de solo lectura.

Dependiendo del resultado del **DMux4Way**, la operación de carga (`load`) se dirige bien sea a la **RAM16K** o a la **pantalla (Screen)**, donde el valor de entrada (`in[16]`) será almacenado.

### Uso del Multiplexor para la Salida de Datos

Una vez que se ha definido la región de memoria correcta, se utiliza un **Multiplexor de 4 vías (Mux4Way16)** para seleccionar qué valor debe ser enviado a la salida. Las opciones para la salida son:

- **RAM**: El valor almacenado en la RAM si la operación fue dirigida a esta región.
- **Pantalla (Screen)**: El valor correspondiente de la memoria gráfica si la operación accedió a la pantalla.
- **Teclado (Keyboard)**: El estado actual del teclado, que es solo de lectura.

El multiplexor se encarga de elegir entre estas tres posibles fuentes y enviar el valor correcto a la salida final (`out[16]`), en función de los mismos bits selectores (`address[13..14]`).

De esta manera, el diseño asegura que las operaciones de lectura y escritura se gestionen de forma eficiente, permitiendo a la CPU interactuar con las diferentes regiones de memoria en el sistema.
"""""



### Flujo completo de datos:
1. La CPU envía una **dirección** de memoria (`address[15]`) y un **valor de entrada** (`in[16]`).
2. Los bits `address[13..14]` deciden, a través del **DMux4Way**, a qué área de memoria (RAM, Screen o Keyboard) debe dirigirse la operación de carga.
3. Si la operación es de **escritura** y la dirección es válida (RAM o pantalla), el valor de entrada se almacena en la memoria correspondiente.
4. El **Mux4Way16** selecciona el valor correcto (RAM, pantalla o teclado) y lo envía a la salida (`out[16]`), dependiendo de la región de memoria seleccionada por los bits `address[13..14]`.
"""""
## 2. CPU
```` hdl
CHIP CPU {

    IN  inM[16],         // M value input  (M = contents of RAM[A])
        instruction[16], // Instruction for execution
        reset;           // Signals whether to re-start the current
                         // program (reset==1) or continue executing
                         // the current program (reset==0).

    OUT outM[16],        // M value output
        writeM,          // Write to M? 
        addressM[15],    // Address in data memory (of M)
        pc[15];          // address of next instruction

    PARTS:
	//// Replace this comment with your code.
       // get type of instruction
    Not(in=instruction[15], out=Ainstruction);
    Not(in=Ainstruction, out=Cinstruction);
    
    And(a=Cinstruction, b=instruction[5], out=ALUtoA);    // C-inst and dest to A-reg?
    Mux16(a=instruction, b=ALUout, sel=ALUtoA, out=Aregin);
    
    Or(a=Ainstruction, b=ALUtoA, out=loadA);    // load A if A-inst or C-inst&dest to A-reg
    ARegister(in=Aregin, load=loadA, out=Aout);
    
    Mux16(a=Aout, b=inM, sel=instruction[12], out=AMout);   // select A or M based on a-bit

    And(a=Cinstruction, b=instruction[4], out=loadD);
    DRegister(in=ALUout, load=loadD, out=Dout);    // load the D register from ALU
    
    ALU(x=Dout, y=AMout, zx=instruction[11], nx=instruction[10], 
        zy=instruction[9], ny=instruction[8], f=instruction[7],
        no=instruction[6], out=ALUout, zr=ZRout, ng=NGout); // calculate
        
    // Set outputs for writing memory
    Or16(a=false, b=Aout, out[0..14]=addressM);
    Or16(a=false, b=ALUout, out=outM);
    And(a=Cinstruction, b=instruction[3], out=writeM);
    
    // calc PCload & PCinc - whether to load PC with A reg
    And(a=ZRout, b=instruction[1], out=jeq);    // is zero and jump if zero
    And(a=NGout, b=instruction[2], out=jlt);    // is neg and jump if neg
    Or(a=ZRout, b=NGout, out=zeroOrNeg);
    Not(in=zeroOrNeg, out=positive);            // is positive (not zero and not neg)
    And(a=positive, b=instruction[0], out=jgt); // is pos and jump if pos
    Or(a=jeq, b=jlt, out=jle);
    Or(a=jle, b=jgt, out=jumpToA);              // load PC if cond met and jump if cond
    And(a=Cinstruction, b=jumpToA, out=PCload); // Only jump if C instruction
    Not(in=PCload, out=PCinc);                  // only inc if not load
    PC(in=Aout, inc=PCinc, load=PCload, reset=reset, out[0..14]=pc);
}
````

Este código describe el funcionamiento de una unidad central de procesamiento (CPU) de 16 bits con arquitectura basada en instrucciones de tipo A y C (similar a la arquitectura Hack). A continuación se detallan las diferentes partes y la lógica implementada:

### Entradas
- **inM[16]**: Valor de entrada desde la memoria (RAM[A]).
- **instruction[16]**: Instrucción actual a ejecutar.
- **reset**: Señal para reiniciar el programa si es 1, o continuar si es 0.

### Salidas
- **outM[16]**: Valor de salida hacia la memoria (RAM).
- **writeM**: Bandera que indica si se debe escribir en memoria.
- **addressM[15]**: Dirección en la memoria a la cual acceder.
- **pc[15]**: Dirección de la siguiente instrucción (Program Counter).

## Descripción del Código
### 1. **Detección del tipo de instrucción**
   - La instrucción puede ser de tipo A o C. 
   - **instruction[15]**: El bit más significativo de la instrucción determina el tipo:
     - 0: Instrucción A.
     - 1: Instrucción C.
   - Se utiliza una puerta NOT para generar señales que indiquen si es una instrucción A o C.
   
### 2. **Registro A**
   - Se carga con la instrucción completa si es una instrucción A, o con el resultado de la ALU si es una instrucción C y está destinada al registro A.
   - Un multiplexor selecciona entre estos dos valores.
   - El registro A se actualiza en ambos casos.

### 3. **Registro D**
   - Solo se actualiza cuando la instrucción C tiene como destino el registro D (controlado por **instruction[4]**).
   - El valor cargado en D proviene de la ALU.

### 4. **ALU (Unidad Lógica Aritmética)**
   - Toma dos entradas:
     - **Dout**: Valor actual del registro D.
     - **AMout**: Valor del registro A o el valor de la memoria (inM), dependiendo del bit a de la instrucción.
   - Realiza operaciones aritméticas/lógicas de acuerdo con los bits de control de la instrucción C (bits 6-11).
   - Genera dos señales adicionales:
     - **ZRout**: Indica si el resultado es cero.
     - **NGout**: Indica si el resultado es negativo.

### 5. **Escritura en Memoria**
   - El valor que sale de la ALU (**ALUout**) se envía a **outM**.
   - El bit **instruction[3]** controla si se debe escribir en memoria, y está activado solo en instrucciones C.
   - La dirección de la memoria viene del registro A.

### 6. **Control del Contador de Programa (PC)**
   - El PC puede incrementarse normalmente o cargarse con el valor del registro A cuando se necesita un salto.
   - Los bits de la instrucción determinan el tipo de salto:
     - **instruction[1]**: Salta si el resultado de la ALU es cero.
     - **instruction[2]**: Salta si el resultado es negativo.
     - **instruction[0]**: Salta si el resultado es positivo.
   - Si alguna de estas condiciones se cumple, el PC se carga con el valor de A.
   - Si no se cumple, el PC simplemente se incrementa.
   - También puede reiniciarse mediante la señal **reset**.

## Resumen
Este código implementa una CPU simple que:
- Ejecuta instrucciones de tipo A (carga directa en el registro A) y tipo C (operaciones de la ALU).
- Controla registros internos (A y D) y realiza saltos condicionales basados en el resultado de la ALU.
- Gestiona las operaciones de lectura y escritura en la memoria RAM y controla el flujo del programa mediante el contador de programa (PC).

## 3. Computer
````
CHIP Computer {

    IN reset;

    PARTS:
    //// Replace this comment with your code.
        ROM32K(address=pc, out=instruction);
    CPU(inM=memOut, instruction=instruction, reset=reset, outM=outM, 
        writeM=writeM, addressM=addressM, pc=pc);
    Memory(in=outM, load=writeM, address=addressM, out=memOut);
}
````
## Entradas
- **reset**: Señal que reinicia la computadora si es activada (valor 1).

## Componentes

### 1. **ROM32K**
   - **Función**: Almacena el programa (instrucciones) que la CPU debe ejecutar.
   - **address=pc**: El contador de programa (**pc**) generado por la CPU se utiliza como dirección para seleccionar la instrucción a ejecutar.
   - **out=instruction**: La instrucción seleccionada de la ROM es enviada a la CPU para ser ejecutada.

### 2. **CPU**
   - **inM=memOut**: La CPU recibe los datos actuales de la memoria a través de **memOut**.
   - **instruction=instruction**: Recibe la instrucción actual desde la ROM32K.
   - **reset=reset**: Reinicia el flujo del programa si **reset** está activado.
   - **outM=outM**: La CPU genera un valor de salida que puede ser almacenado en la memoria.
   - **writeM=writeM**: Señal que indica si la CPU quiere escribir en la memoria.
   - **addressM=addressM**: Dirección en la memoria donde la CPU quiere leer o escribir.
   - **pc=pc**: El contador de programa, que apunta a la siguiente instrucción a ejecutar, es actualizado por la CPU.
   
### 3. **Memory**
   - **in=outM**: La memoria recibe el valor que la CPU quiere escribir.
   - **load=writeM**: Controla si la memoria debe escribir el valor que recibió en la dirección especificada.
   - **address=addressM**: Dirección en la memoria a la cual se accede para leer o escribir.
   - **out=memOut**: La salida de la memoria (**memOut**) es enviada a la CPU, permitiendo que la CPU lea el valor almacenado en la dirección seleccionada.

## Descripción General del Flujo

1. **Instrucción desde la ROM**: El contador de programa (**pc**) generado por la CPU apunta a una dirección en la **ROM32K**, de donde se lee una instrucción. Esta instrucción es enviada a la CPU para ser ejecutada.

2. **Ejecución en la CPU**:
   - La CPU toma la instrucción leída desde la ROM y el valor actual de la memoria (**memOut**) para realizar cálculos o control de flujo.
   - La CPU genera una serie de salidas:
     - **outM**: El valor que quiere almacenar en memoria.
     - **writeM**: Indica si debe escribir en memoria.
     - **addressM**: Dirección en la memoria donde quiere leer o escribir.
     - **pc**: Actualiza el contador de programa para apuntar a la próxima instrucción.

3. **Interacción con la Memoria**:
   - La **Memory** recibe el valor de la CPU (**outM**) y, si la señal **writeM** está activada, escribe ese valor en la dirección especificada por **addressM**.
   - Si no se está escribiendo, la memoria sigue proporcionando a la CPU el valor almacenado en la dirección solicitada (**memOut**).

## Resumen
Este chip simula una computadora básica que:
- Ejecuta un programa almacenado en la ROM32K.
- Realiza cálculos y controla el flujo del programa a través de la CPU.
- Interactúa con la memoria para leer y escribir valores necesarios para el programa.

La interacción entre estos tres componentes permite a la computadora ejecutar un ciclo completo de operaciones, leyendo instrucciones, ejecutándolas, y almacenando o accediendo a valores en la memoria según sea necesario.
