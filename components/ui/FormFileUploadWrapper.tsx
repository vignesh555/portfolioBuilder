import React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from './form'
import { Input } from './input'
import Image from 'next/image'

import { Control, FieldErrors, UseFormStateReturn } from 'react-hook-form';

interface FormFileUploadWrapperProps {
  // form: {
  //   control: Control;
  //   formState: UseFormStateReturn<{
  //     setValue: (name: string, value: string) => void;
  //   }> & { errors: FieldErrors };
  // };
  form: any;
  setSelectedFileUpload: (file: File) => void;
  heroImage: string | null;
  name: string;
}

function FormFileUploadWrapper({ name, form, setSelectedFileUpload, heroImage }: FormFileUploadWrapperProps) {
  return (
    <>
      <FormField
              control={form.control}
              name={name}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedFileUpload(e.target.files![0])
                        form?.setValue(name, e.target.files![0].name);
                      }}
                    />
                  </FormControl>
                  {form.formState.errors[name] ? (
                    <FormMessage />
                  ) : (
                    <div className="text-sm text-muted-foreground min-h-[20px]">&nbsp;</div>
                  )}
                  {heroImage && <div className="border p-2 w-max">
                    <Image
                      src={heroImage}
                      className="w-32 h-32"
                      alt="Hero image"
                      width={150}
                      height={150}
                    />
                  </div>}
                </FormItem>
              )}
            />
    </>
  )
}

export default FormFileUploadWrapper
