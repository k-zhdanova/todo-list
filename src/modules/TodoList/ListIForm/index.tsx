import { Form, Formik } from "formik";
import styles from './index.module.css';
import { ListItemType } from "../types";
import { Textarea } from "../../../components/Formik/Textarea";
import { Checkbox } from "../../../components/Formik/Checkbox";
import { Button } from "../../../ui/Button";
import { Select } from "../../../components/Formik/Select";
import { CATEGORIES } from "../constants";
import { Input } from "../../../components/Formik/Input";

interface ListFormProps {
  listItem?: ListItemType;
  onSubmit: (
    values: ListItemType,
  ) => void;
}

const initialValues: ListItemType = {
  title: '',
  description: '',
  isDone: false,
  order: 0,
}

export const ListForm = ({listItem, onSubmit}: ListFormProps) => {
  
  return (
    <Formik initialValues={listItem || initialValues} onSubmit={onSubmit}>
      {() => 
        <>
          <h2>{listItem ? 'Edit' : 'Add'} item</h2>
          <Form className={styles.form}>
            <Checkbox name="isDone" label="Is done" />

            <Select
              options={[
                { value: '', label: 'None' }, 
                ...CATEGORIES
              ]}
              label="Category"
              name="category"
              placeholder="Select category"
            />

            <Input 
              name="title"
              label="Title"
              type="text"
              placeholder="Enter title"
              required
            />
            
            <Textarea
              name="description"
              label="Description"
              placeholder="Enter description"
            />

            <Button type="submit">Save</Button>
          </Form>
        </>
      }
    </Formik>
  )
}