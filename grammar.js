module.exports = grammar({
    name: 'HLA_ASSEMBLY',

    rules: {
        source_file: $ => repeat($._definition),

        _definition: $ => choice(
            $.program_definition
        ),

        program_definition: $ => seq(
            'program',
            $.identifier,
            ';',
            repeat($.include),
            optional($.static_section),
            optional($.val_section),
            optional($.const_section),
            repeat($._procedure),
            'begin',
            $.identifier,
            ';',
            repeat($._statement),
            'end',
            $.identifier,
            ';',
        ),

        data_type: $ => choice(
          'cset','dword','enum','int128','int16','int32','int64','int8',
          'lword','qword','real128','real32','real64','real80','string',
          'tbyte','text','thunk','uns128','uns16','uns32','uns64','uns8',
          'wchar','word','wstring','zstring'
        ),

        register: $ => choice(
          'al','ah','ax','eax','bl','bh','bx','ebx',
          'cl','ch','cx','ecx','dl','dh','dx','edx',

        ),

        instruction: $ => choice(
          'aaa','aad','aam','aas','adc','add','addpd','addps','addsd','addss',
          'addsubpd','addsubps','and','andnpd','andnps','andpd','andps',
          'arpl','bp','bsf','bsr','bswap','bt','btc','btr','bts','cbw',
          'cdq','clc','cld','clflush','cli','clts','cmc','cmova','cmovae',
          'cmovb','cmovbe','cmovc','cmove','cmovg','cmovge','cmovl','cmovle',
          'cmovna','cmovnae','cmovnb','cmovnbe','cmovnc','cmovne','cmovng',
          'cmovnge','cmovnl','cmovnle','cmovno','cmovnp','cmovns','cmovnz',
          'cmovo','cmovp','cmovpe','cmovp','cmovs','cmovz','cmp','cmpeqpd',
          'cmpeqps','cmpeqsd','cmpeqss','cmplepd','cmpleps','cmplesd','cmpless',
          'cmpltpd','cmpltps','cmpltsd','cmpltss','cmpneqpd','cmpneqps',
          'cmpneqsd','cmpneqss','cmpnlepd','cmpnleps','cmpnlesd','cmpnless',
          'cmpnltpd','cmpnltps','cmpnltsd','cmpnltss','cmpordpd','cmpordps',
          'cmpordsd','cmpordss','cmppd','cmpps','cmpsb','cmpsd','cmpss',
          'cmpsw','cmpunordpd','cmpunordps','cmpunordsd','cmpunordss','cmpxchg',
          'cmpxchg8b','comisd','comiss','cpuid','cvtdq2pd','cvtdq2ps','cvtpd2dq',
          'cvtpd2pi','cvtpd2ps','cvtpi2pd','cvtpi2ps','cvtps2dq','cvtps2pd',
          'cvtps2pi','cvtsd2si','cvtsd2ss','cvtsi2sd','cvtsi2ss','cvtss2sd',
          'cvtss2si','cvttpd2dq','cvttpd2pi','cvttps2dq','cvttps2pi','cvttsd2si',
          'cvttss2si','cwd','cwde','daa','das','dec','div','divpd','divps',
          'divsd','divss','emms','enter','f2xm1','fabs','fadd','faddp',
          'fbld','fbstp','fchs','fclex','fcmova','fcmovae','fcmovb','fcmovbe',
          'fcmove','fcmovna','fcmovnae','fcmovnb','fcmovnbe','fcmovne',
          'fcmovnu','fcmovu','fcom','fcomi','fcomip','fcomp','fcompp','fcos',
          'fdecstp','fdiv','fdivp','fdivr','fdivrp','ffree','fiadd','ficom',
          'ficomp','fidiv','fidivr','fild','fimul','fincstp','finit','fist',
          'fistp','fisttp','fisub','fisubr','fld','fld1','fldcw','fldenv',
          'fldl2e','fldl2t','fldlg2','fldln2','fldpi','fldz','fmul','fmulp',
          'fnclex','fninit','fnop','fnsave','fnstcw','fnstenv','fnstsw',
          'fpatan','fprem','fprem1','fptan','frndint','frstor','fsave',
          'fscale','fsin','fsincos','fsqrt','fst','fstcw','fstenv','fstp',
          'fstsw','fsub','fsubp','fsubr','fsubrp','ftst','fucom','fucomi',
          'fucomip','fucomp','fucompp','fwait','fxam','fxch','fxrstor',
          'fxsave','fxtract','fyl2x','fyl2xp1','haddpd','haddps','hlt',
          'hsubpd','hsubps','idiv','imod','imul','in','inc','insb','insd',
          'insw','int','intmul','into','invd','invlpg','iret','iretd','lahf',
          'lar','lddqu','ldmxcsr','lds','lea','leave','les','lfence','lfs',
          'lgdt','lgs','lidt','lldt','lmsw','lock.adc','lock.add','lock.and',
          'lock.btc','lock.btr','lock.bts','lock.cmpxchg','lock.dec','lock.inc',
          'lock.neg','lock.not','lock.or','lock.sbb','lock.sub','lock.xadd',
          'lock.xchg','lock.xor','lodsb','lodsd','lodsw','loop','loope',
          'loopne','loopnz','loopz','lsl','lss','ltreg','maskmovdqu','maskmovq',
          'maxpd','maxps','maxsd','maxss','mfence','minpd','minps','minsd',
          'minss','mod','monitor','mov','movapd','movaps','movd','movddup',
          'movdq2q','movdqa','movdqu','movhlps','movhpd','movhps','movlhps',
          'movlpd','movlps','movmskpd','movmskps','movntdq','movnti','movntpd',
          'movntps','movntq','movq','movq2dq','movsb','movsd','movshdup',
          'movsldup','movss','movsw','movsx','movupd','movups','movzx',
          'mul','mulpd','mulps','mulsd','mulss','mwait','neg','nop','not',
          'or','orpd','orps','out','outsb','outsd','outsw','packssdw','packsswb',
          'packuswb','paddb','paddd','paddq','paddsb','paddsw','paddusb',
          'paddusw','paddw','pand','pandn','pause','pavgb','pavgw','pcmpeqb',
          'pcmpeqd','pcmpeqw','pcmpgtb','pcmpgtd','pcmpgtw','pextrw','pinsrw',
          'pmaddwd','pmaxsw','pmaxub','pminsw','pminub','pmovmskb','pmulhuw',
          'pmulhw','pmullw','pmuludq','pop','popa','popad','popf','popfd',
          'por','prefetchnta','prefetcht0','prefetcht1','prefetcht2','psadbw',
          'pshufd','pshufhw','pshuflw','pshufw','pslld','pslldq','psllq',
          'psllw','psrad','psraw','psrld','psrldq','psrlq','psrlw','psubb',
          'psubd','psubq','psubsb','psubsw','psubusb','psubusw','psubw',
          'punpckhbw','punpckhdq','punpckhqdq','punpckhwd','punpcklbw',
          'punpckldq','punpcklqdq','punpcklwd','push','pusha','pushad',
          'pushd','pushf','pushfd','pushw','pxor','rcl','rcpps','rcpss',
          'rcr','rdmsr','rdpmc','rdtsc','rep.insb','rep.insd','rep.insw',
          'rep.movsb','rep.movsd','rep.movsw','rep.outsb','rep.outsd','rep.outsw',
          'rep.stosb','rep.stosd','rep.stosw','repe.cmpsb','repe.cmpsd',
          'repe.cmpsw','repe.scasb','repe.scasd','repe.scasw','repne.cmpsb',
          'repne.cmpsd','repne.cmpsw','repne.scasb','repne.scasd','repne.scasw',
          'repnz.cmpsb','repnz.cmpsd','repnz.cmpsw','repnz.scasb','repnz.scasd',
          'repnz.scasw','repz.cmpsb','repz.cmpsd','repz.cmpsw','repz.scasb',
          'repz.scasd','repz.scasw','ret','rol','ror','rsm','rsqrtps','rsqrtss',
          'sahf','sal','sar','sbb','scasb','scasd','scasw','seta','setae',
          'setb','setbe','setc','sete','setg','setge','setl','setle','setna',
          'setnae','setnb','setnbe','setnc','setne','setng','setnge','setnl',
          'setnle','setno','setnp','setns','setnz','seto','setp','setpe',
          'setpo','sets','setz','sfence','sgdt','shl','shld','shr','shrd',
          'shufpd','shufps','sidt','sldt','smsw','sqrtpd','sqrtps','sqrtsd',
          'sqrtss','stc','std','sti','stmxcsr','stosb','stosd','stosw',
          'streg','sub','subpd','subps','subsd','subss','sysenter','sysexit',
          'ucomisd','ucomiss','ud2','unpckhpd','unpckhps','unpcklpd','unpcklps',
          'verr','verw','vmt','wbinvd','wrmsr','xadd','xchg','xlat','xor',
          'xorpd','xorps'
        ),

        dot: $ => seq(
          '.',
          $.identifier
        ),

        identifier: $ => /[_|a-z|A-Z]+\w*/,

        type_coerced_identifier: $ => seq(
          '(',
          'type',
          $.data_type,
          $.identifier,
          ')'
        ),

        literal: $ => choice(
          $.char_literal,
          $.string_literal,
          $.int_literal,
          $.float_literal,
          $.bool_literal
        ),

        char_literal: $ => /\'.\'/,

        string_literal: $ => /\".*\"/,

        int_literal: $ => /[-]?\d+/,

        float_literal: $ => /-?\d+\.\d*/,

        bool_literal: $ => choice('true', 'false'),

        include: $ => seq(
            choice('#include','#includeonce'),
            '(',
            '"',
            $.identifier,
            '.hhf',
            '"',
            ')',
            ';'
        ),

        _statement: $ => choice(
            $._jump,
            $._function,
            $._instruction,
            $._exception,
            $._control_of_flow
        ),

        _jump: $ => choice(
          $.jump_statement,
          $.jump_label
        ),

        jump_statement: $ => seq(
            $.jump_type,
            $.identifier,
            ';'
        ),

        jump_type: $ => choice(
          'ja','jae','jb','jbe','jc','jcxz','je','jecxz','jf','jg','jge',
          'jl','jle','jmp','jna','jnae','jnb','jnbe','jnc','jne','jng',
          'jnge','jnl','jnle','jno','jnp','jns','jnz','jo','jp','jpe','jpo',
          'js','jt','jz'
        ),

        jump_label: $ => seq(
          $.identifier,
          ':'
        ),

        _function: $ => choice(
          $.function_call,
          $.function_call_paren
        ),

        function_call: $ => seq(
          'call',
          $.identifier,
          ';'
        ),

        function_call_paren: $ => seq(
          $.identifier,
          optional($.dot),
          $.argument_list,
          ';'
        ),

        argument_list: $ => seq(
          '(',
          optional($.args_list),
          ')'
        ),

        args_list: $ => seq(
          $.argument,
          repeat($.second_argument)
        ),

        argument: $ => choice(
          $.literal,
          $.identifier,
          $.type_coerced_identifier,
          $.register
        ),

        second_argument: $ => seq(
          ',',
          $.argument
        ),

        _instruction: $ => seq(
          $.instruction,
          $.argument_list,
          ';'
        ),

        _exception: $ => seq(
          'try',
          repeat1($._statement),
          repeat1($.catch),
          'endtry',
          ';'
        ),

        catch: $ => seq(
          '(',
          $.exception_id,
          ')',
          ';',
          repeat1($._statement)
        ),

        exception_id: $ => seq(
          $.identifier,
          optional($.dot)
        ),

        _control_of_flow: $ => choice(
          $.if_statement,
          $.switch_statement,
          $.for_loop,
          $.while_loop,
          $.repeat_loop,
          $.forever_loop,
          $.break,
          $.breakif,
          $.continue
        ),

        break: $ => seq(
          'break',
          ';'
        ),

        breakif: $ => seq(
          'breakif',
          '(',
          $.boolean_expression,
          ')',
          ';'
        ),

        continue: $ => seq(
          'continue',
          ';'
        ),

        comparison: $ => choice(
          '>','<','==','=','!=','<>','>=','<='
        ),

        boolean_expression: $ => choice(
          $.boolean_value,
          $.boolean_comparison,
          $.boolean_comparison_negated
        ),

        boolean_value: $ => seq(
          optional('!'),
          $.argument
        ),

        boolean_comparison: $ => seq(
          $.argument,
          $.comparison,
          $.argument
        ),

        boolean_comparison_negated: $ => seq(
          '!',
          '(',
          $.boolean_expression,
          repeat($.second_boolean_expression),
          ')'
        ),

        second_boolean_expression: $ => seq(
          choice('&&', '||'),
          $.boolean_expression
        ),

        if_statement: $ => seq(
          'if',
          '(',
          $.boolean_expression,
          repeat($.second_boolean_expression),
          ')',
          'then',
          repeat($._statement),
          repeat($.elseif_statement),
          optional($.else_statement),
          'endif',
          ';'
        ),

        elseif_statement: $ => seq(
          'elseif',
          '(',
          $.boolean_expression,
          repeat($.second_boolean_expression),
          ')',
          'then',
          repeat($._statement)
        ),

        else_statement: $ => seq(
          'else',
          repeat($._statement)
        ),

        switch_statement: $ => seq(
          'switch',
          '(',
          $.register,
          ')',
          repeat($.switch_case),
          optional($.switch_default),
          'endswitch',
          ';'
        ),

        switch_case: $ => seq(
          'case',
          '(',
          $.literal,
          ')',
          repeat($._statement)
        ),

        switch_default: $ => seq(
          'default',
          repeat($._statement)
        ),

        for_loop: $ => seq(
          'for',
          '(',
          $._statement,
          ';',
          $.boolean_expression,
          ';',
          $._statement,
          ')',
          'do',
          repeat($._statement),
          'endfor',
          ';'
        ),

        while_loop: $ => seq(
          'while',
          '(',
          $.boolean_expression,
          ')',
          'do',
          repeat($._statement),
          'endwhile',
          ';'
        ),

        repeat_loop: $ => seq(
          'repeat',
          repeat($._statement),
          'until',
          '(',
          $.boolean_expression,
          ')',
          ';'
        ),

        forever_loop: $ => seq(
          'forever',
          repeat($._statement),
          'endfor',
          ';'
        ),


        static_section: $ => seq(
          'static',
          repeat($.variable_declaration)
        ),

        var_section: $ => seq(
          'var',
          $.var_decl,
          repeat($.second_var_decl)
        ),

        var_decl: $ => seq(
          $.identifier,
          ':',
          $.data_type,
          ';'
        ),

        second_var_decl: $ => seq(
          optional('var'),
          $.var_decl
        ),

        val_section: $ => seq(
          'val',
          $.val_decl,
          repeat($.second_val_decl)
        ),

        val_decl: $ => seq(
          $.identifier,
          $.variable_init,
          ';'
        ),

        second_val_decl: $ => seq(
          optional('val'),
          $.val_decl
        ),

        const_section: $ => seq(
          'const',
          $.const_decl,
          repeat($.second_const_decl)
        ),

        const_decl: $ => seq(
          $.identifier,
          ':',
          $.data_type,
          $.variable_init,
          ';'
        ),

        second_const_decl: $ => seq(
          optional('const'),
          $.const_decl
        ),

        variable_declaration: $ => seq(
          $.identifier,
          ':',
          $.data_type,
          optional($.variable_init),
          ';'
        ),

        variable_init: $ => seq(
          ':=',
          $.literal
        ),

        _procedure: $ => choice(
          $.procedure_forward,
          $.procedure_impl
        ),

        parameter_list: $ => seq(
          '(',
          $.parameter,
          repeat($.second_parameter),
          ')'
        ),

        parameter: $ => seq(
          optional('var'),
          $.identifier,
          ':',
          $.data_type
        ),

        second_parameter: $ => seq(
          ';',
          $.parameter
        ),

        procedure_returns: $ => seq(
          '@returns',
          '(',
          $.string_literal,
          ')',
          ';'
        ),

        procedure_forward: $ => seq(
          'procedure',
          $.identifier,
          optional($.parameter_list),
          ';',
          optional($.procedure_returns),
          'forward',
          ';'
        ),

        procedure_impl: $ => seq(
          'procedure',
          $.identifier,
          optional($.parameter_list),
          ';',
          optional($.procedure_returns),
          optional($.static_section),
          optional($.var_section),
          optional($.val_section),
          optional($.const_section),
          'begin',
          $.identifier,
          ';',
          repeat($._statement),
          'end',
          $.identifier,
          ';'
        )

    }
});
