struct B { 
    virtual int func();
    void haha() { }
};

struct A
    : public B
{
    virtual int func() override;
};




int A::func() {
    B().haha();
    return 2;
}

int B::func() {
    return 1;
}

int func() {
    auto a = A();
    a.func();
}